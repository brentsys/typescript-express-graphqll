import {Account, CheckoutReference, KashRequest, Resolvers} from '../types'
import {makeResponse, rejectResponse} from '../lib/resolver_tools'
import {ModelType, baseLog, kashRequestTemplate} from '../constants'
import {getFirestore} from 'firebase-admin/firestore'
import {getRequestOrigin} from '../lib/authentication'
import Codes, {AppError} from '../lib/error_codes'
import {ModelTypeConverter} from '../lib/model_type.converter'
import _ from 'lodash'
import {getCurrencyCode} from '../lib/utils'

const dLog = baseLog('resolver.kashRequest')

async function saveRequest(kr: KashRequest): Promise<string> {
  const db = getFirestore()
  const write = await db.collection(ModelType.kashRequest).add(kr)
  return write.id
}

async function getAccount(accountId: string): Promise<Account | AppError> {
  const db = getFirestore()
  const accountSnap = await db.collection(ModelType.account)
    .doc(accountId)
    .get()
  if (!accountSnap.exists) return new AppError(Codes.AccountIdError)
  return accountSnap.data() as Account
}


async function validateOrigin(origin: string, partnerId: string): Promise<AppError | CheckoutReference> {
  const db = getFirestore()
  if (!partnerId) return new AppError(Codes.AccountIdError)
  const converter: ModelTypeConverter<CheckoutReference> = new ModelTypeConverter()

  const snap = await db.collection(ModelType.partner).doc(partnerId)
    .collection(ModelType.authorizedUrl)
    .where("url", "==", origin)
    .where("status", ">=", 0)
    .withConverter(converter)
    .get()
  if (snap.empty) new AppError(Codes.UnregisteredOriginUrl)
  const docs = snap.docs.map(doc => doc.data())
  return _.first(docs) ?? new AppError(Codes.UnregisteredOriginUrl)
}


const resolvers: Resolvers = {
  Mutation: {
    createRequest: async (_, {params}, req) => {
      const origin = await getRequestOrigin(req)
      if (origin instanceof AppError) return rejectResponse(origin)
      dLog({params})
      const account = await getAccount(params.accountId)
      dLog({account})
      if (account instanceof AppError) return rejectResponse(account)
      const reference = await validateOrigin(origin, account.partnerId)
      if (reference instanceof AppError) return rejectResponse(reference)
      const kr = kashRequestTemplate
      kr.data.amount = params.amount
      kr.data.creditId = account.code
      kr.data.creditName = account.name
      kr.data.transactionId = params.transactionId
      kr.data.currencyCode = getCurrencyCode(account.mcId)
      kr.data.mcId = account.mcId
      kr.emitId = reference.id
      const id = await saveRequest(kr)
      const result = Promise.resolve({id})
      return makeResponse(result, (resp) => ({id: resp.id}))
    }
  }
}

export default resolvers
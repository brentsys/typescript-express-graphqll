import {Account, KashRequest, Resolvers} from '../types'
import {makeResponse, rejectResponse} from '../lib/resolver_tools'
import {ModelType, baseLog, kashRequestTemplate} from '../constants'
import {getFirestore} from 'firebase-admin/firestore'
import {validateRequest} from '../lib/authentication'
import Codes, {AppError} from '../lib/error_codes'

const dLog = baseLog('resolver.kashRequest')

async function saveRequest(kr: KashRequest): Promise<string> {
  const db = getFirestore()
  const write = await db.collection(ModelType.kashRequest).add(kr)
  return write.id
}

async function getAccount(accountId: string): Promise<Account> {
  const db = getFirestore()
  const accountSnap = await db.collection(ModelType.account)
    .doc(accountId)
    .get()
  if (!accountSnap.exists) throw new AppError(Codes.AccountIdError)
  return accountSnap.data() as Account
}


const resolvers: Resolvers = {
  Mutation: {
    createRequest: async (_, {params}, req) => {
      try {
        const apiKey = await validateRequest(req)
        dLog({params})
        const {accountId} = apiKey
        const account = await getAccount(accountId)
        dLog({account})
        const kr = kashRequestTemplate
        if (params.noCancel) kr.noCancel = params.noCancel
        kr.data.amount = params.amount
        kr.data.creditId = account.code
        kr.data.creditName = account.name
        kr.data.transactionId = params.transactionId
        kr.data.currencyCode = params.currency
        kr.data.mcId = account.mcId
        kr.emitId = apiKey.id
        kr.callbackUrl = params.callbackUrl
        if (account.partnerId) kr.data.partnerId = account.partnerId
        const id = await saveRequest(kr)
        const result = Promise.resolve({id})
        return makeResponse(result, (resp) => ({id: resp.id}))
      } catch (error) {
        if (error instanceof AppError) return rejectResponse(error)
        const err = new AppError(Codes.UnexpectedError)
        const msg: string = (error as Error).message
        if (msg) err.message = msg
        return rejectResponse(err)
      }
    }
  }
}

export default resolvers
import {Account, KashRequest, Resolvers} from '../types'
import {makeResponse, manageError} from '../lib/resolver_tools'
import {ModelType, baseLog, kashRequestTemplate} from '../constants'
import {getFirestore} from 'firebase-admin/firestore'
import {validateDashRequest, validateRequest} from '../lib/authentication'
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
        if (params.info) kr.info = params.info
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
        return manageError(error)
      }
    },
    createDashRequest: async (_, {params}, req) => {
      try {
        const {apiKeyId, info, amount, currency} = params
        const apiKey = await validateDashRequest(req, apiKeyId)
        const {accountId} = apiKey
        const account = await getAccount(accountId)
        const kr = {...kashRequestTemplate, noCancel: true}
        kr.data.amount = amount
        kr.data.info = info
        kr.data.creditId = account.code
        kr.data.creditName = account.name
        kr.data.currencyCode = currency
        kr.data.mcId = account.mcId
        kr.emitId = apiKey.id
        kr.data.partnerId = apiKey.partnerId
        const id = await saveRequest(kr)
        const result = Promise.resolve({id})
        return makeResponse(result, (resp) => ({id: resp.id}))
      } catch (error) {
        return manageError(error)
      }
    }
  }
}

export default resolvers
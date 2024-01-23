import {Request} from "express"
import Codes, {AppError} from "./error_codes"
import {ModelType, baseLog} from "../constants"
import {getFirestore} from "firebase-admin/firestore"
import {ModelTypeConverter, getRecord} from "./model_type.converter"
import {CheckoutApi} from "../types"
import {decode} from 'jsonwebtoken'
import _ from 'lodash'

const dLog = baseLog("authentication")

export function getToken(req: Request): string | undefined {
  let token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase
  if (token && typeof token === 'string' && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
    return token
  }
}

export async function validateRequest(req: Request): Promise<CheckoutApi> {
  const db = getFirestore()
  const converter: ModelTypeConverter<CheckoutApi> = new ModelTypeConverter()
  const {headers} = req
  const apiKey = headers["x-api-key"]
  dLog({apiKey})
  if (!apiKey) throw new AppError(Codes.NoAPIKey)
  const snap = await db.collectionGroup(ModelType.apiKey)
    .where("apiKey", "==", apiKey)
    .where("status", ">=", 0)
    .withConverter(converter)
    .get()
  if (snap.empty) throw new AppError(Codes.InvalidAPIKey)
  const doc = snap.docs[0]
  return doc.data()
}

export async function getPartnerIdFromToken(req: Request): Promise<string> {
  const token = getToken(req)
  if (!token) throw new AppError(Codes.NoJwtToken)
  const jwt = decode(token)
  if (typeof jwt !== 'object') throw new AppError(Codes.InvalidJWTToken)
  const partnerId: string = _.get(jwt, "partnerId")
  console.log({jwt, partnerId})
  if (!partnerId) throw new AppError(Codes.InvalidJWTToken)
  return partnerId
}


export async function validateDashRequest(req: Request, apiKeyId: string): Promise<CheckoutApi> {
  const partnerId = await getPartnerIdFromToken(req)
  if (!partnerId) throw new AppError(Codes.InvalidJWTToken)
  const parentPath = [ModelType.partner, partnerId].join('/')

  return getRecord(apiKeyId, ModelType.apiKey, parentPath)
}
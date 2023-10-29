import {Request} from "express"
import Codes, {AppError} from "./error_codes"
import {ModelType, baseLog} from "../constants"
import {getFirestore} from "firebase-admin/firestore"
import {ModelTypeConverter} from "./model_type.converter"
import {CheckoutApi} from "../types"

const dLog = baseLog("authentication")

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
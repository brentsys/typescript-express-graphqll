import {Request} from "express"
import Codes, {AppError} from "./error_codes"
import {baseLog} from "../constants"

const dLog = baseLog("authentication")

export async function getRequestOrigin(req: Request): Promise<AppError | string> {
  const {headers} = req
  const {origin} = headers
  if (!origin) return new AppError(Codes.InvalidOrigin)
  dLog({origin})
  return origin
}
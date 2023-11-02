/* eslint-disable @typescript-eslint/no-explicit-any */
import {MutationResponse} from "../types"
import Codes, {AppError, ErrorCode} from "./error_codes"

export async function rejectResponse(code: ErrorCode): Promise<MutationResponse> {
  const promise = AppError.reject(code)
  return makeResponse(promise)
}

export async function makeResponse<T>(promise: Promise<T>, fn?: (resp: T) => any, message = 'Record successfully created!'): Promise<MutationResponse> {
  try {
    const record = await promise
    const response = {
      code: 200,
      success: true,
      message
    }
    return !fn ? response : Object.assign(response, fn(record))
  } catch (err) {
    console.error(err)
    const code = err instanceof AppError ? err.code : 400
    const errResponse = {
      code,
      success: false,
      message: (err as any).message,
    }
    return errResponse
  }
}

export function manageError(error: any) {
  if (error instanceof AppError) return rejectResponse(error)
  const err = new AppError(Codes.UnexpectedError)
  const msg: string = (error as Error).message
  if (msg) err.message = msg
  return rejectResponse(err)
}
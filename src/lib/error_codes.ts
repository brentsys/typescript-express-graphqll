import {GraphQLError} from 'graphql'

export type ErrorCode = {
  code: number,
  message: string
}

const InvalidOrigin: ErrorCode = {code: 7001, message: "Invalid Origin header"}
const UnregisteredOriginUrl: ErrorCode = {code: 7002, message: "Unauthorized origin URL"}
const AccountIdError: ErrorCode = {code: 7010, message: "Invalid accountId"}
const InvalidOriginUrl: ErrorCode = {code: 7011, message: "Invalid origin Url for this account"}

export default {
  InvalidOrigin,
  UnregisteredOriginUrl,
  InvalidOriginUrl, AccountIdError
}


export class AppError extends Error {
  code: number
  constructor(error: ErrorCode) {
    super(error.message)
    this.code = error.code
  }

  static reject(code: ErrorCode, api = false) {
    if (api) {
      throw new GraphQLError(code.message, {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: {status: 401}
        }
      })
    }
    return Promise.reject(new AppError(code))
  }
}



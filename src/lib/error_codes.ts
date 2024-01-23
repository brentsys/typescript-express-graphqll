import {GraphQLError} from 'graphql'

export type ErrorCode = {
  code: number,
  message: string
}

const NoAPIKey: ErrorCode = {code: 7001, message: "Invalid No API key"}
const NotAllowed: ErrorCode = {code: 7000, message: "Missing permission"}
const InvalidAPIKey: ErrorCode = {code: 7011, message: "Invalid API Key"}
const AccountIdError: ErrorCode = {code: 7010, message: "Invalid accountId"}
const NoJwtToken: ErrorCode = {code: 7090, message: "Invalid Authorization header"}
const InvalidJWTToken: ErrorCode = {code: 7091, message: "Invalid JWT token"}
const UnexpectedError: ErrorCode = {code: 7099, message: "Unexpected error"}

export default {
  NotAllowed,
  NoAPIKey,
  InvalidAPIKey,
  AccountIdError,
  UnexpectedError,
  NoJwtToken,
  InvalidJWTToken
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



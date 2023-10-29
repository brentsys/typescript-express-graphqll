import {GraphQLError} from 'graphql'

export type ErrorCode = {
  code: number,
  message: string
}

const NoAPIKey: ErrorCode = {code: 7001, message: "Invalid No API key"}
const InvalidAPIKey: ErrorCode = {code: 7011, message: "Invalid API Key"}
const AccountIdError: ErrorCode = {code: 7010, message: "Invalid accountId"}
const UnexpectedError: ErrorCode = {code: 7099, message: "Unexpected error"}

export default {
  NoAPIKey,
  InvalidAPIKey,
  AccountIdError,
  UnexpectedError
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



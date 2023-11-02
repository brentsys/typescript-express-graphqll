import {KashRequest} from "./types";
import debug from "debug";

const BaseLog = "krApp"
export const baseLog = (file: string) => debug([BaseLog, file].join(':'))

export const ModelType = {
  account: "accounts",
  apiKey: "checkout_api",
  kashRequest: "kash_requests",
  partner: "partners"
}

export const AuthorizationTypes = ['Basic']

export const kashRequestTemplate: KashRequest = {
  completed: false,
  data: {
    amount: 0,
    category: 2,
    creditId: "creditId",
    creditName: "name",
    currencyCode: "XAF",
    info: "info",
    mcId: "mcId",
  },
  emitId: "emitId",
  fields: ["accountId", "accountName"],
  secured: false,
  type: 'xfer',
  userId: "public",
  version: "v0.0"
}
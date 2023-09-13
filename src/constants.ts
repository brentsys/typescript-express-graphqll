import {KashRequest} from "./types";
import debug from "debug";

const BaseLog = "krApp"
export const baseLog = (file: string) => debug([BaseLog, file].join(':'))

export const ModelType = {
  account: "accounts",
  authorizedUrl: "checkout_urls",
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
    transactionId: ""
  },
  emitId: "emitId",
  fields: ["accountId", "accountName"],
  secured: false,
  userId: "userId",
  version: "v0.0"
}
import {Resolvers} from "../types";

const resolvers: Resolvers = {
  Query: {
    ping: async (_, {name}) => {
      return {text: `Hello ${name}`}
    }
  }
}

export default resolvers
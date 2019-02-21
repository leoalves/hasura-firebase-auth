import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMessages } from '../../../../graphql/queries/message'
const uuidv4 = require('uuid/v4')

const messageResolver = {
  addMessage: (
    _: any,
    { title, message, type }: { title: string; message: string; type: string },
    { cache, getCacheKey }: { cache: InMemoryCache; getCacheKey: any }
  ) => {
    const { messages }: any | [] = cache.readQuery({
      query: getMessages
    })
    const data = {
      messages: messages.concat({
        id: uuidv4(),
        type,
        title,
        message,
        __typename: 'message'
      })
    }

    cache.writeData({ data })
    return null
  },
  deleteMessage: (
    _: any,
    { id }: { id: string },
    { cache, getCacheKey }: { cache: InMemoryCache; getCacheKey: any }
  ) => {
    const { messages }: any | [] = cache.readQuery({
      query: getMessages
    })

    const data = {
      messages: messages.filter((alert: any) => alert.id !== id)
    }
    cache.writeData({ data })
    return null
  }
}
export default messageResolver

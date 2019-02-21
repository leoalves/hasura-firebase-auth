import { InMemoryCache } from 'apollo-cache-inmemory'
import { getAlerts } from '../../../../graphql/queries/alerts'
const uuidv4 = require('uuid/v4')

const alertResolver = {
  addAlert: (
    _: any,
    { title, message, type }: { title: string; message: string; type: string },
    { cache, getCacheKey }: { cache: InMemoryCache; getCacheKey: any }
  ) => {
    const { alerts }: any | [] = cache.readQuery({
      query: getAlerts
    })
    const data = {
      alerts: alerts.concat({
        id: uuidv4(),
        type,
        title,
        message,
        __typename: 'alert'
      })
    }

    cache.writeData({ data })
    return null
  },
  deleteAlert: (
    _: any,
    { id }: { id: string },
    { cache, getCacheKey }: { cache: InMemoryCache; getCacheKey: any }
  ) => {
    const { alerts }: any | [] = cache.readQuery({
      query: getAlerts
    })

    const data = {
      alerts: alerts.filter((alert: any) => alert.id !== id)
    }
    cache.writeData({ data })
    return null
  }
}
export default alertResolver

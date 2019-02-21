import { InMemoryCache } from 'apollo-cache-inmemory'
import { getNotifications } from '../../../../graphql/queries/notifications'
const uuidv4 = require('uuid/v4')

const notificationResolver = {
  addNotification: (
    _: any,
    { title, message, type }: { title: string; message: string; type: string },
    { cache, getCacheKey }: { cache: InMemoryCache; getCacheKey: any }
  ) => {
    const { notifications }: any | [] = cache.readQuery({
      query: getNotifications
    })
    const data = {
      notifications: notifications.concat({
        id: uuidv4(),
        type,
        title,
        message,
        __typename: 'notification'
      })
    }

    cache.writeData({ data })
    return null
  },
  deleteNotification: (
    _: any,
    { id }: { id: string },
    { cache, getCacheKey }: { cache: InMemoryCache; getCacheKey: any }
  ) => {
    const { notifications }: any | [] = cache.readQuery({
      query: getNotifications
    })

    const data = {
      notifications: notifications.filter(
        (notification: any) => notification.id !== id
      )
    }
    cache.writeData({ data })
    return null
  }
}
export default notificationResolver

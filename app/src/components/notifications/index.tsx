import * as React from 'react'
import { getNotifications } from '../../graphql/queries/notifications'
import { deleteNotification } from '../../graphql/mutations/notifications'
import { notification } from 'antd'
import { Query, Mutation } from 'react-apollo'

const Notifications = () => {
  return (
    <React.Fragment>
      <Query query={getNotifications}>
        {({ loading, error, data }) => {
          if (data && data.notifications.length > 0) {
            return data.notifications.map(
              (item: {
                id: string
                type?: 'success' | 'info' | 'warning' | 'error'
                title: string
                message: string
              }) => {
                return (
                  <Mutation mutation={deleteNotification}>
                    {(deleteNotification, { data }) => {
                      notification.open({
                        message: item.title,
                        description: item.message,
                        type: item.type,
                        onClose: () => {
                          deleteNotification({ variables: { id: item.id } })
                        }
                      })
                      return <div />
                    }}
                  </Mutation>
                )
              }
            )
          }
          return <div />
        }}
      </Query>
    </React.Fragment>
  )
}

export default Notifications

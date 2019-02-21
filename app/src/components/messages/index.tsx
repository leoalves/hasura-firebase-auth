import * as React from 'react'
import { getMessages } from '../../graphql/queries/message'
import { deleteMessage } from '../../graphql/mutations/messages'
import { message } from 'antd'
import { Query, Mutation } from 'react-apollo'

const Messages = () => {
  return (
    <React.Fragment>
      <Query query={getMessages}>
        {({ loading, error, data }) => {
          if (data && data.messages.length > 0) {
            return data.messages.map(
              (item: {
                id: string
                type: 'success' | 'info' | 'warning' | 'error'
                title: string
                message: string
              }) => {
                return (
                  <Mutation mutation={deleteMessage}>
                    {(deleteMessage, { data }) => {
                      message[item.type](item.message, 5, () => {
                        deleteMessage({ variables: { id: item.id } })
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

export default Messages

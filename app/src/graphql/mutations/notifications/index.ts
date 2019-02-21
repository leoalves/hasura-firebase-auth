import gql from 'graphql-tag'

export const addNotification = gql`
  mutation addNotification($message: String!, $type: String!, $title: String) {
    addNotification(message: $message, title: $title, type: $type) @client {
      id
      title
      type
      message
    }
  }
`

export const deleteNotification = gql`
  mutation deleteNotification($id: String!) {
    deleteNotification(id: $id) @client {
      id
    }
  }
`

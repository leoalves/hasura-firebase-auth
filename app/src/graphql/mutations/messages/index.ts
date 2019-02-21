import gql from 'graphql-tag'

export const addMessage = gql`
  mutation addMessage($message: String!, $type: String!, $title: String) {
    addMessage(message: $message, title: $title, type: $type) @client {
      id
      title
      type
      message
    }
  }
`

export const deleteMessage = gql`
  mutation deleteMessage($id: String!) {
    deleteMessage(id: $id) @client {
      id
    }
  }
`

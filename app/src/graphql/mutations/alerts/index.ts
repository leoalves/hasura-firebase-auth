import gql from 'graphql-tag'

export const addAlert = gql`
  mutation addAlert($message: String!, $type: String!, $title: String) {
    addAlert(message: $message, title: $title, type: $type) @client {
      id
      title
      type
      message
    }
  }
`

export const deleteAlert = gql`
  mutation deleteAlert($id: String!) {
    deleteAlert(id: $id) @client {
      message
    }
  }
`

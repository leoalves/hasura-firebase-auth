import gql from 'graphql-tag'

export const getMessages = gql`
  query GetMessages {
    messages @client {
      id
      message
      title
      type
    }
  }
`

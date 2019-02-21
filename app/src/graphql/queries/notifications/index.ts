import gql from 'graphql-tag'

export const getNotifications = gql`
  query GetNotifications {
    notifications @client {
      id
      message
      title
      type
    }
  }
`

import gql from 'graphql-tag'

export const getAlerts = gql`
  query GetAlerts {
    alerts @client {
      id
      message
      title
      type
    }
  }
`

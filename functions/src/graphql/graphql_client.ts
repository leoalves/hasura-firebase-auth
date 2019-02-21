import { GraphQLClient } from 'graphql-request'
import { graphql_host, hasuraAccessKey } from '../config/graphql'

export const client = new GraphQLClient(graphql_host, {
  headers: { 'x-hasura-admin-secret': hasuraAccessKey }
})

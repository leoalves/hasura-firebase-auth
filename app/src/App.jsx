import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import client from './graphql/client'
import Alerts from './components/alerts'
import Router from './components/router'

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Alerts />
        <Router />
      </ApolloProvider>
    )
  }
}

export default App

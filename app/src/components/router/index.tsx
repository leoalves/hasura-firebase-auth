import { Layout } from 'antd'
import React from 'react'

import Loader from './Loader'
import useIsAuthenticated from '../../hooks/useIsAuthenticated'
import AnonymousView from './AnonymousView'
import AppView from './AppView'

const Router = (props: any) => {
  // get value from useIsAuthenticated custom hook
  const authenticated = useIsAuthenticated()

  if (authenticated === undefined || authenticated === null) {
    return (
      <Layout
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Loader />
      </Layout>
    )
  }
  if (authenticated === true) {
    return (
      <Layout
        style={{
          width: '100vw',
          height: '100vh'
        }}
      >
        <AppView>
          <h1>Children</h1>
        </AppView>
      </Layout>
    )
  }
  return (
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <AnonymousView />
    </Layout>
  )
}

export default Router

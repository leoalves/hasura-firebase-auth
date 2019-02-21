import * as React from 'react'
import Login from '../user/Login'
import CreateAccount from '../user/CreateAccount'
import ResetPassword from '../user/ResetPassword'
import { Router } from '@reach/router'

const AnonymousView = () => {
  return (
    <div style={{ maxWidth: '500px', width: '90vw' }}>
      <Router>
        <ResetPassword path="/reset-password" />
        <CreateAccount path="/signup" />
        <Login path="/*" />
        <Login path="/login" />
      </Router>
    </div>
  )
}

export default AnonymousView

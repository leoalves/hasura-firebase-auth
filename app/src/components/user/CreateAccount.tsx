import { Card } from 'antd'
import Loader from '../router/Loader'
import * as React from 'react'
import { Link, navigate } from '@reach/router'
import CreateAccountForm from './CreateAccountForm'

const CreateAccount = ({ path }: { path: string }) => {
  return (
    <Card
      title="Create New Account"
      style={{
        width: '100%',
        textAlign: 'center'
      }}
    >
      <CreateAccountForm />
      <Link className="login-form-forgot" to="/signin">
        Already have an account? Sign in.
      </Link>
    </Card>
  )
}

export default CreateAccount

import { Form, Icon, Input, Button, Card, Divider } from 'antd'
import * as React from 'react'

import { Link } from '@reach/router'

import firebase from '../../firebase'

import { Mutation } from 'react-apollo'
import { addAlert } from '../../graphql/mutations/alerts'

const FormItem = Form.Item

class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      loading: false
    }
  }

  public handleSubmit = (e: any, onAddAlert: any) => {
    e.preventDefault()
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        try {
          this.setState({
            loading: true
          })
          await firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
        } catch (error) {
          this.setState({
            loading: false
          })
          if (error && error.message) {
            onAddAlert({
              variables: {
                message: error.message,
                type: 'error',
                title: 'ERROR!'
              }
            })
          } else {
            onAddAlert({
              variables: {
                message: 'Error Signin. Please try again or contact us.',
                type: 'error',
                title: 'ERROR!'
              }
            })
          }
        }
      }
    })
  }

  public render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Card
        title="Login"
        style={{
          width: '100%',
          textAlign: 'center'
        }}
      >
        <Form className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Mutation mutation={addAlert}>
              {onAddAlert => {
                return (
                  <Button
                    loading={this.state.loading}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ display: 'block', margin: 'auto' }}
                    onClick={(e: React.SyntheticEvent) =>
                      this.handleSubmit(e, onAddAlert)
                    }
                  >
                    Log in
                  </Button>
                )
              }}
            </Mutation>

            <Link className="login-form-forgot" to="/signup">
              Create account
            </Link>

            <Divider type="vertical" />
            <Link className="login-form-forgot" to="/reset-password">
              Forgot password
            </Link>
          </FormItem>
        </Form>
      </Card>
    )
  }
}

const WrappedLoginForm = Form.create()(Login)

export default WrappedLoginForm

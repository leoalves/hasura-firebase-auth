import { Form, Icon, Input, Button, Card } from 'antd'
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
          this.setState({ loading: true })
          await firebase.auth().sendPasswordResetEmail(values.email)
          this.setState({ loading: false })
          onAddAlert({
            variables: {
              message: `An email with a link to reset your password was sent to ${
                values.email
              }. Please check your inbox.`,
              type: 'success',
              title: 'Link sent with success!'
            }
          })
        } catch (error) {
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
                message:
                  'Error reseting password. Please try again or contact us.',
                type: 'error',
                title: 'ERROR!'
              }
            })
          }
          this.setState({ loading: false })
        }
      }
    })
  }

  public render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Card
        title="Reset your Password"
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
                    Reset Password
                  </Button>
                )
              }}
            </Mutation>

            <Link className="login-form-forgot" to="/login">
              {'Back to login'}
            </Link>
          </FormItem>
        </Form>
      </Card>
    )
  }
}

const WrappedLoginForm = Form.create()(Login)

export default WrappedLoginForm

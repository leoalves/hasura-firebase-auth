import { Form, Input, AutoComplete, Button, Row, Col } from 'antd'
import * as React from 'react'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { Link, navigate } from '@reach/router'
import { Mutation } from 'react-apollo'
import { addAlert } from '../../graphql/mutations/alerts'
import axios from 'axios'
import firebase from '../../firebase'
import { firebaseUrl } from '../../config/config'

const FormItem = Form.Item

const Option = AutoComplete.Option

var autocomplete: any = null

class CreateAccountForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      address: '',
      predictions: [],
      loading: false
    }
  }

  public onHandleSubmit(e: any, addAlert: any) {
    e.preventDefault()
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        this.setState({
          loading: true
        })
        try {
          const newAccount: any = await axios.post(firebaseUrl, {
            ...values
          })
          if (newAccount.data && newAccount.data.error) {
            addAlert({
              variables: {
                type: 'error',
                title: 'Error',
                message: newAccount.data.error.message
              }
            })
            this.setState({
              loading: false
            })
          } else {
            await firebase
              .auth()
              .signInWithEmailAndPassword(values.email, values.password)
          }
        } catch (err) {
          addAlert({
            variables: {
              type: 'error',
              title: 'Error',
              message: 'Error creating account'
            }
          })
          this.setState({
            loading: false
          })
        }
      } else {
        addAlert({
          variables: {
            type: 'error',
            title: 'Error',
            message: 'Error creating account'
          }
        })
        this.setState({
          loading: false
        })
      }
    })
  }

  public render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form className="login-form">
        <FormItem>
          <Row gutter={12}>
            <Col span={12}>
              {getFieldDecorator('firstName', {
                rules: [{ required: true, message: 'First Name Required!' }]
              })(<Input type="text" placeholder="First Name" />)}
            </Col>
            <Col span={12}>
              {getFieldDecorator('lastName', {
                rules: [{ required: true, message: 'Last Name Required!' }]
              })(<Input type="text" placeholder="Last Name" />)}
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Email Address Required!' }]
          })(<Input type="text" placeholder="Email" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Password Required!' }]
          })(<Input type="password" placeholder="Password" />)}
        </FormItem>
        <FormItem>
          <Mutation mutation={addAlert}>
            {addAlert => {
              return (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ display: 'block', margin: 'auto' }}
                  loading={this.state.loading}
                  onClick={(e: any) => {
                    this.onHandleSubmit(e, addAlert)
                  }}
                >
                  Create Account
                </Button>
              )
            }}
          </Mutation>
        </FormItem>
      </Form>
    )
  }
}

const WrappedCreateAccountForm = Form.create()(CreateAccountForm)

export default WrappedCreateAccountForm

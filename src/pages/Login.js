import React, { Component } from 'react';
import {
  Alert, Button, Card, Checkbox, Form, Icon, Input,
} from 'antd';
import queryString from 'query-string'
import AppLayout from '../layouts/AppLayout';
import { UserContext } from '../UserContext';
import './Login.less';
import api from '../helpers/Api.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({
      loading: true,
      error: null,
    });

    this.props.form.validateFields(async (err, values) => {
      let success;
      if (!err) {
        console.log('Received values of form: ', values);
        
        const res = await api.login(values['email'],
                                    values['password'],
                                    values['remember']);
        if (res.code !== api.code.ok) {
          switch (res.code) {
            case -1:
              this.setState({ error: 'Incorrect password' })
              break
            case -4:
              this.setState({ error: 'Request too often' })
              break
            case -5:
              this.setState({ error: 'Email did not exist' })
              break
            default:
              this.setState({ error: 'Unknown error' })
              break
          }
        } else {
          success = true;
        }
      }

      this.setState({ loading: false });

      if (success) {
        // async function, no need to wait
        // once finished, this will cause the whole page rerender
        // then the isLoggedIn check below will handle the redirection
        this.props.userContext.toggleRefresh();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <UserContext.Consumer>
        {({ isLoggedIn }) => {
          if (isLoggedIn) {
            const values = queryString.parse(this.props.location.search);
            if (values.path) {
              this.props.history.push('/' + values.path);
            } else {
              this.props.history.push('/dashboard');
            }
          } else {
            return (
              <AppLayout>
                <Card className="login-form-card">
                  <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                      { getFieldDecorator('email', {
                        rules: [{
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        }, {
                          required: true,
                          message: 'Please input your E-mail!',
                        }],
                      })(
                        <Input
                          prefix={(
                            <Icon
                              type="mail"
                              style={{ fontSize: '16px', color: 'rgba(0,0,0,.25)' }}
                            />
                          )}
                          size="large"
                          placeholder="Email"
                          style={{ marginBottom: '12px' }}
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      { getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input.Password
                          prefix={(
                            <Icon
                              type="lock"
                              style={{ fontSize: '16px', color: 'rgba(0,0,0,.25)' }}
                            />
                          )}
                          size="large"
                          type="password"
                          placeholder="Password"
                        />,
                      )}
                    </Form.Item>
                    { this.state.error ? 
                      <div className="red-6">{
                        <Alert
                          message={this.state.error}
                          type="error"
                          closable="true"
                          showIcon />}
                      </div> : null
                    }
                    <Form.Item style={{ marginBottom: '0px' }}>
                      { getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                      })(
                      <Checkbox>Remember me</Checkbox>
                      )}
                      {/* TODO forgot password
                      <a href="/" className="login-form-forgot">Forgot password</a> */}
                      <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={this.state.loading}
                        className="login-form-button"
                        block
                      >
                      Login
                      </Button>
                      Or
                      {' '}
                      <a href="/register">register now!</a>
                    </Form.Item>
                  </Form>
                </Card>
              </AppLayout>
            );
          }
        }}
      </UserContext.Consumer>
    );
  }
}

const WithContext = (Component) => {
  return (props) => (
      <UserContext.Consumer>
        {userContext =>  <Component {...props} userContext={userContext} />}
      </UserContext.Consumer>
  )
}

export default Form.create()(WithContext(Login));

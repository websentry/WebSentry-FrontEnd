import React, { Component } from 'react';
import {
  Button, Card, Form, Icon, Input,
} from 'antd';
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
      email: '',
      password: '',
    };

    this.emailOnchange = (e) => {
      this.onLoginValueChange('email', e.target.value);
    };

    this.passwordOnchange = (e) => {
      this.onLoginValueChange('password', e.target.value);
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onLoginValueChange(key, val) {
    this.setState({ [key]: val });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({
      loading: true,
      error: null,
    });

    let formIsValid = true;
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (err) {
        formIsValid = false;
      }
    });

    let success = false;
    const { email, password } = this.state;
    if (formIsValid) {
      const res = await api.login(email, password);
      if (res.code !== api.code.ok) {
        this.setState({ error: res.msg });
        console.log('---- Error ----');
        console.log(res);
      } else {
        success = true;
      }
    }
    this.setState({ loading: false });
    if (success) {
      // TODO: set loggin state instead
      this.props.history.push('/dashboard');
      window.location.reload();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <UserContext.Consumer>
        {({ isLoading, isLoggedIn }) => {
          if (isLoggedIn) {
            this.props.history.push('/');
          } else {
            return (
              <AppLayout>
                <Card className="login-form-card">
                  <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                      { getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input
                          prefix={(
                            <Icon
                              type="mail"
                              style={{ color: 'rgba(0,0,0,.25)' }}
                            />
)}
                          size="large"
                          placeholder="Email"
                          onChange={this.emailOnchange}
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input
                          prefix={(
                            <Icon
                              type="lock"
                              style={{ color: 'rgba(0,0,0,.25)' }}
                            />
)}
                          size="large"
                          type="password"
                          placeholder="Password"
                          onChange={this.passwordOnchange}
                        />,
                      )}
                    </Form.Item>
                    {this.state.error ? <div className="red-6">{this.state.error}</div> : null}
                    <Form.Item className="last-form-item">
                      { // TODO remember me
                    /* {getFieldDecorator('remember', {
                      valuePropName: 'checked',
                      initialValue: true,
                    })(
                      <Checkbox>Remember me</Checkbox>
                    )}
                    // TODO forgot password
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
                      <a href="/">register now!</a>
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

export default Form.create()(Login);

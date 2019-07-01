import React, { Component } from 'react';
import AppLayout from '../layouts/AppLayout';
import { Button, Card, Checkbox, Form, Icon, Input } from 'antd';
import './Login.less';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <AppLayout>
        <div>
          <Card className="login-form-card">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={ <Icon type="user"
                                        style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="username" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={ <Icon type="lock" 
                                        style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="password" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Remember me</Checkbox>
                )}
                <a href="" className="login-form-forgot">Forgot password</a>
                <Button type="primary"
                        htmlType="submit"
                        className="login-form-button" block>
                  Login
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </AppLayout>
    );
  }
}

export default Form.create()(Login); 
import React, { Component } from 'react';
import AppLayout from '../layouts/AppLayout';
import { Button, Card, Checkbox, Form, Icon, Input } from 'antd';
import { UserContext } from '../UserContext';
import './Login.less';
import Api from '../helpers/Api.js';

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
        Api.login(values.userName,values.password).then((res) => {
          console.log(res);
        }).catch((error) =>{
          console.log(error);
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <UserContext.Consumer>
      {({isLoading,isLoggedIn})=>{
        console.log(isLoading,isLoggedIn);
        if(isLoggedIn){
          console.log(this.props.history.push("/"));
        }else{
          return(<AppLayout>
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
          </AppLayout>)
        }
      }}
      </UserContext.Consumer>
    );
  }
}

export default Form.create()(Login);

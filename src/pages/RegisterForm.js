import React, { Component } from 'react'
import AppLayout from '../layouts/AppLayout'
import { Button, Card, Col, Form, Icon, Input, Row, Steps, message } from 'antd'
import './RegisterForm.less'
import api from '../helpers/Api.js'

const { Step } = Steps;

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      length: 3,
      loading: false,
      error: null
    }
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <AppLayout>
        <Card className="register-form-card">
          <Steps current={this.state.current}>
            <Step key={"Register"} title={"Register"} />
            <Step key={"Verification"} title={"Verification"} />
            <Step key={"Complete"} title={"Complete"} />
          </Steps>
          <div className="steps-content">{
            <Form>
              {(() => {
                switch (this.state.current) {
                  case 0: return (
                    <Row>
                      <Form.Item className="register-form-item">
                        { getFieldDecorator('email', {
                          rules: [{
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          }, {
                            required: true,
                            message: 'Please input your E-mail!',
                          },],
                        }) (<Input placeholder="E-mail" onChange={this.emailOnChange} />)}
                      </Form.Item>
                      <Form.Item className="register-form-item" hasFeedback>
                        { getFieldDecorator('password', {
                          rules: [{
                            required: true,
                            message: 'Please input your password!',
                          }, {
                            validator: this.validateToNextPassword,
                          },],
                        }) (<Input.Password placeholder="Password"/>)}
                      </Form.Item>
                      <Form.Item className="register-form-item" hasFeedback>
                        { getFieldDecorator('confirm', {
                          rules: [{
                            required: true,
                            message: 'Please confirm your password!',
                          }, {
                            validator: this.compareToFirstPassword,
                          },],
                        }) (<Input.Password placeholder="Confirm password" onBlur={this.handleConfirmBlur}
                          />)}
                      </Form.Item>
                    </Row>
                  );
                  case 1: return "#00FF00";
                  case 2: return "#0000FF";
                  default:      return null;
                }
              })()}
            </Form>
          }
          </div>
          <div className="steps-action">
            {this.state.current < 2 && (
              <Button type="primary" className="register-form-button" onClick={() => this.next()}>
                Next
                <Icon type="right" />
              </Button>
            )}
            {this.state.current === 1 && (
              <Button onClick={() => this.prev()}>
                <Icon type="left" />
                Previous
              </Button>
            )}
            {this.state.current === 2 && (
              <Button type="primary" className="register-form-button" href="/login">
                Login
              </Button>
            )}
        </div>
        </Card>
      </AppLayout>
    )
  }
}

export default Form.create()(RegisterForm)

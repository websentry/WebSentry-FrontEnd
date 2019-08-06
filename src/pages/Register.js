import React, { Component } from 'react'
import AppLayout from '../layouts/AppLayout'
import {
  Button, Card, Col, Form, Icon, Input, Result, Row, Steps, Tooltip, message
} from 'antd'
import './Register.less'
import api from '../helpers/Api.js'

const { Step } = Steps;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 64;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      email: null,
      password: null,
      code: null,
      verificationLoading: false,
      verificationError: null,
      registerLoading: false,
      registerError: null
    }

    this.emailOnChange = (e) => {
      this.onLoginValueChange('email', e.target.value);
    }

    this.handleStepZero = this.handleStepZero.bind(this)
    this.handleStepOne = this.handleStepOne.bind(this)
    this.handleVerification = this.handleVerification.bind(this)
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  onLoginValueChange(key, val) {
    this.setState({ [key]: val });
  }

  // step 0: email, password
  handleStepZero(e) {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received register values of form: ', values);

        this.setState({
          email: values['email'],
          password: values['password']
        })

        this.next();
      }
    })
  }

  // step 1: create account
  async handleStepOne(e) {
    e.preventDefault();

    this.setState({
      registerLoading: true,
      registerError: null
    })

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received register values of form: ', values);

        const res = await api.register(
          this.state.email,
          this.state.password,
          values['code']
        )

        if (res.code !== api.code.ok) {
          let msg;
          switch (res.code) {
            case -1:
              msg = "Wrong verification code"
              break
            case -2:
              msg = "Wrong parameter"
              break
            case -6:
              msg = "Account already exists"
              break
            default:
              msg = "Unknown error";
              break
          }
          this.setState({ registerError: msg })
          message.info(msg)
        } else {
          this.next()
        }
        this.setState({ registerLoading: false })
      }
    })
  }

  // request verification code
  async handleVerification (e) {
    e.preventDefault();

    this.setState({
      verificationLoading: true,
      verificationError: null
    })

    const res = await api.verification(this.state.email);

    console.log("value: ", res)

    if (res.code !== api.code.ok) {
      let msg;
      switch (res.code) {
        case -2:
          msg = "Wrong parameter";
          break;
        case -6:
          msg = "Account already exists";
          break;
        default:
          msg = "Unknown error";
          break;
      }
      this.setState({ verificationError: msg })
      message.info(msg);
    } else {
      message.info('Verification code has been sent!');
    }
    this.setState({ verificationLoading: false })
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
    // 8-64 characters, at least one letter and one number
    const re = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d^a-zA-Z0-9].{7,63}$");

    if (value && this.state.confirmDirty && re.test(value)) {
        form.validateFields(['confirm'], { force: true });
    } else if (!re.test(value)) {
      callback('Password is not valid!')
    }
    callback();
  }

  stepZero() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Form {...formItemLayout} >
        <Form.Item label="E-mail" className="register-form-item" >
          { getFieldDecorator('email', {
            rules: [{
              type: 'email',
              message: 'The input is not valid E-mail!',
            }, {
              required: true,
              message: 'Please input your E-mail!',
            },],
          }) (<Input onChange={this.emailOnChange} />)}
        </Form.Item>
        <Form.Item
          className="register-form-item"
          hasFeedback
          label={
            <span>
              Password&nbsp;
              <Tooltip title="Password requires 8~64 characters, 
                at least one letter and one number.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          { getFieldDecorator('password', {
            rules: [{
              required: true,
              message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            },],
          }) (<Input.Password />)}
        </Form.Item>
        <Form.Item
          className="register-form-item"
          hasFeedback
          label="Confirm Password"
        >
          { getFieldDecorator('confirm', {
            rules: [{
              required: true,
              message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            },],
          }) (<Input.Password onBlur={this.handleConfirmBlur}
            />)}
        </Form.Item>
      </Form>
    );
  }

  stepOne() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item className="register-form-item" >
        <Input placeholder="E-mail" value={this.state.email} disabled />
        </Form.Item>
        <Form.Item
          className="register-form-item"
          extra="We must make sure that your email is valid."
        >
          <Row gutter={8} >
          <Col span={12} >
            { getFieldDecorator('code', {
              rules: [{
                required: true,
                message: 'Please input the verification code!'
              }],
            })(<Input placeholder="Verification Code" />)}
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              loading={this.verificationLoading}
              onClick={this.handleVerification}
              className="verification-button"
              block
            >
              Get verification code!
            </Button>
          </Col>
          </Row>
        </Form.Item>
      </Form>
    );
  }

  stepTwo() {
    return (
      <Form>
        <Result
          status="success"
          title="Welcome to Web Sentry!"
          subTitle="You have completed the sign up."
        />
      </Form>
    );
  }

  render() {
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
                  case 0: return this.stepZero();
                  case 1: return this.stepOne();
                  case 2: return this.stepTwo();
                  default: return null;
                }
              })()}
            </Form>
          }
          </div>
          <Row gutter={24} >
            <div className="steps-action">  
              { this.state.current === 1 && (
                <Col span={12} style={{ textAlign: 'left'}}>
                  <Button onClick={() => this.prev()}>
                    <Icon type="left" />
                    Previous
                  </Button>
                </Col>
              )}
              { this.state.current === 0 && (
                <Col span={24} style={{ textAlign: 'right'}}>
                  <Button
                    type="primary"
                    className="register-form-button"
                    loading={this.state.verificationLoading}
                    onClick={this.handleStepZero}>
                    Next
                    <Icon type="right" />
                  </Button>
                </Col>
              )}
              { this.state.current === 1 && (
                <Col span={12} style={{ textAlign: 'right'}}>
                  <Button
                    type="primary"
                    className="register-form-button"
                    loading={this.state.registerLoading}
                    onClick={this.handleStepOne}
                  >
                    Submit
                    <Icon type="right" />
                  </Button>
                </Col>
              )}
              { this.state.current === 2 && (
                <Col span={24} style={{ textAlign: 'right'}}>
                  <Button
                    type="primary"
                    className="register-form-button"
                    href="/login"
                  >
                    Login
                    <Icon type="right" />
                  </Button>
                </Col>
              )}
            </div>
          </Row>
        </Card>
      </AppLayout>
    )
  }
}

export default Form.create()(Register)

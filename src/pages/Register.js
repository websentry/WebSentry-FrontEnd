import React, { Component } from 'react'
import AppLayout from '../layouts/AppLayout';
import { UserContext } from '../UserContext';

import {
  LeftOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Form } from 'antd';
import '@ant-design/compatible/assets/index.css';

import { Alert, Button, Card, Col, Input, Result, Row, Steps, Tooltip, message } from 'antd';
import './Register.less'
import api from '../helpers/Api.js'

const { Step } = Steps;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 64;

let moment = require('moment-timezone');

class Register extends Component {
  formRef = React.createRef();

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
      registerError: null,
      success: false,
      alertMsg: null
    }

    this.emailOnChange = (e) => {
      this.onLoginValueChange('email', e.target.value);
    }

    this.handleStepZero = this.handleStepZero.bind(this);
    this.handleStepOne = this.handleStepOne.bind(this);
    this.handleVerification = this.handleVerification.bind(this);
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

    this.formRef.current.validateFields().then(values => {
      console.log('Received register values of form: ', values);

      this.setState({
        email: values['email'],
        password: values['password'],
        success: false
      })

      this.next();
    });
  }

  // step 1: create account
  handleStepOne(e, lang) {
    e.preventDefault();

    this.setState({
      registerLoading: true,
      registerError: null
    })

    this.formRef.current.validateFields().then(async values => {
      const res = await api.register(
        this.state.email,
        this.state.password,
        lang,
        moment.tz.guess(),
        values['code']
      )

      if (res.code !== api.code.ok) {
        let msg;
        switch (res.code) {
          case api.code.authError:
            msg = 'Wrong verification code'
            break
          case api.code.wrongParam:
            msg = 'Wrong parameter'
            break
          case api.code.alreadyExist:
            msg = 'Account already exists'
            break
          default:
            msg = 'Unknown error';
            break
        }
        this.setState({
          registerError: msg,
          success: false
        })
        message.info(msg)
      } else {
        this.next()
      }
    })
    this.setState({ registerLoading: false })
  }

  // request verification code
  async handleVerification (e) {
    e.preventDefault();

    this.setState({
      verificationLoading: true,
      verificationError: null
    })

    const res = await api.verification(this.state.email);

    if (res.code !== api.code.ok) {
      let msg;
      switch (res.code) {
        case api.code.wrongParam:
          msg = 'Wrong parameter';
          break;
        case api.code.alreadyExist:
          msg = 'Account already exists';
          break;
        default:
          msg = 'Unknown error';
          break;
      }
      this.setState({
        success: false,
        verificationError: msg,
      })
      message.info(msg);
    } else {
      this.setState({ success: true })
      message.info('Verification code has been sent!');
      this.setState({
        alertMsg: 'Please check your email inbox.'
      })
    }
    this.setState({ verificationLoading: false })
  }

  stepZero() {
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
      <Form {...formItemLayout} className='register-form' ref={this.formRef}>
        <Form.Item
          label='Email'
          className='register-form-item'
          name='email'
          rules={[{
            type: 'email',
            message: 'The input is not valid Email!',
          }, {
            required: true,
            message: 'Please input your Email!',
          }]}
        >
          <Input onChange={this.emailOnChange} />
        </Form.Item>
        <Form.Item
          className='register-form-item'
          hasFeedback
          label={
            <span>
              Password&nbsp;
              <Tooltip title='Password requires 8~64 characters.'>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            () => ({
              validator(rule,value) {
                if (value && value.length < MIN_PASSWORD_LENGTH) {
                  return Promise.reject('Password length is too short!')
                } else if (value && value.length > MAX_PASSWORD_LENGTH) {
                  return Promise.reject('Password length is too long!')
                }
                return Promise.resolve();
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className='register-form-item'
          hasFeedback
          label='Confirm Password'
          name='confirm'
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
            }})
          ]}
        >
          <Input.Password/>
        </Form.Item>
      </Form>
    );
  }

  stepOne() {
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
      <Form {...formItemLayout} ref={this.formRef}>
        <Form.Item className='register-form-item' >
          <Input placeholder='Email' value={this.state.email} disabled />
        </Form.Item>
        <Form.Item
          className='register-form-item'
          extra='We must make sure that your email is valid.'
          name='code'
          rules={[{
            required: true,
            message: 'Please input the verification code!'
          }]}
        >
          <Row gutter={8} >
          <Col span={12} >
            <Input placeholder='Verification Code' />
          </Col>
          <Col span={12}>
            <Button
              type='primary'
              loading={this.state.verificationLoading}
              onClick={this.handleVerification}
              className='verification-button'
              disabled={this.state.success}
              block
            >
              Get verification code!
            </Button>
          </Col>
          </Row>
        </Form.Item>
        <Form.Item className='register-form-item'>
          { this.state.success &&
              <Alert
                message={this.state.alertMsg}
                type='success'
                banner='true'
              />
          }
        </Form.Item>
      </Form>
    );
  }

  stepTwo() {
    return (
      <Form>
        <Result
          status='success'
          title='Welcome to Web Sentry!'
          subTitle='You have completed the sign up.'
        />
      </Form>
    );
  }

  render() {
    return (
      <AppLayout page='register'>
        <Card className='register-form-card'>
          <Steps current={this.state.current}>
            <Step key={'Register'} title={'Register'} icon={<UserOutlined />} />
            <Step key={'Verification'} title={'Verification'} icon={<SolutionOutlined />} />
            <Step key={'Complete'} title={'Complete'} icon={<SmileOutlined />} />
          </Steps>
          <div className='steps-content'>{
            <div>
              {(() => {
                switch (this.state.current) {
                  case 0: return this.stepZero();
                  case 1: return this.stepOne();
                  case 2: return this.stepTwo();
                  default: return null;
                }
              })()}
            </div>
          }
          </div>
          {/* <Row gutter={48} > */}
            <div className='steps-action'>
              { this.state.current === 1 && (
                <UserContext.Consumer>
                  {({ lang }) => (
                    <Row gutter={24} >
                    <Col span={12} style={{ textAlign: 'left'}}>
                      <Button onClick={() => this.prev()}>
                        <LeftOutlined />
                        Previous
                      </Button>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                    <Button
                      type='primary'
                      className='register-form-button'
                      loading={this.state.registerLoading}
                      onClick={e => this.handleStepOne(e, lang)}
                    >
                      Submit
                      <RightOutlined />
                    </Button>
                    </Col>
                    </Row>
                  )}
                </UserContext.Consumer>
              )}
              { this.state.current === 0 && (
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button
                    type='primary'
                    // className='register-form-button'
                    loading={this.state.verificationLoading}
                    onClick={this.handleStepZero}>
                    Next
                    <RightOutlined />
                  </Button>
                </Col>
              )}
              { this.state.current === 2 && (
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button
                    type='primary'
                    className='register-form-button'
                    href='/login'
                  >
                    Login
                    <RightOutlined />
                  </Button>
                </Col>
              )}
            </div>
          {/* </Row> */}
        </Card>
      </AppLayout>
    );
  }
}

export default Register

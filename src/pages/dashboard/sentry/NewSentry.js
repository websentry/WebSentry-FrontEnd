import React, { Component } from 'react';
import { LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import {
  Card,
  Input,
  Form,
  Modal,
  Row,
  Select,
  Spin,
  Steps,
  Typography,
} from 'antd';
import ReactCrop from 'react-image-crop';
import BottomNav from './BottomNav';
import 'react-image-crop/dist/ReactCrop.css';
import api from '../../../helpers/Api.js';
import './NewSentry.less';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { injectIntl } from 'react-intl';

const { Title } = Typography;
const { Search } = Input;
const { Option, OptGroup } = Select;
const { Step } = Steps;

const initialState = {
  error: null,
  urlError: null,
  currentSection: 0,
  isFormLoading: false, // form loading
  isUrlLoading: false, // url loading
  url: '',
  name: '',
  screenshotLink: '',
  crop: {
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  },
  scaleX: 0,
  scaleY: 0,
};

class NewSentry extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.loadData();
    this.urlOnChange = (e) => {
      this.onSentryValueChange('url', e.target.value);
    };
    this.goUrlSection = () => {
      this.setState({ currentSection: 0 });
    };
    this.goCropSection = () => {
      this.setState({ currentSection: 1 });
    };
    this.goInfoSection = () => {
      this.setState({ currentSection: 2 });
    };
    this.resetState = () => {
      this.setState(initialState);
    };
    this.goDashboard = () => {
      this.props.history.push('/dashboard');
    };
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
    this.handleSentrySubmit = this.handleSentrySubmit.bind(this);
    this.onCropChange = this.onCropChange.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
  }

  async loadData() {
    const res = await api.getAllNotifications();

    if (res.code === api.code.ok) {
      this.setState({
        // update default email name value
        notificationList: res.data.notifications.map((n) =>
          n.name === '--default--' ? { ...n, name: 'Default Email' } : n
        ),
      });
    } else {
      // no error code
      const { intl } = this.props;
      Modal.error({
        title: intl.formatMessage({ id: 'notificationFailGet' }),
        onOk: () => {
          window.location.reload();
        },
      });
    }
  }

  setSectionVisibility = (urlSection, cropSection, infoSection) => {
    this.setState({
      showUrlSection: urlSection,
      showCropSection: cropSection,
      showInfoSection: infoSection,
    });
  };

  onSentryValueChange = (key, val) => {
    this.setState({ [key]: val });
  };

  onCropChange = (_, percentCrop) => {
    this.setState({ crop: percentCrop });
  };

  onImageLoaded = (image) => {
    this.setState({
      screenshotScaleX: image.naturalWidth / 100,
      screenshotScaleY: image.naturalHeight / 100,
    });
  };

  async handleUrlSubmit(url, event) {
    event.preventDefault();
    if (url) {
      this.setState({ isUrlLoading: true, urlError: null });
      let res = await api.requestFullScreenshot(this.state.url);
      if (res.code === api.code.ok) {
        let sentryId = res.data.taskId;
        res = await api.waitFullScreenshot(sentryId);
        if (res.code === api.code.ok) {
          // check feedback code
          if (res.data.feedbackCode === api.code.ok) {
            this.setState({
              isUrlLoading: false,
              screenshotLink: api.getFullScreenshotLink(
                sentryId,
                res.data.imageToken
              ),
              currentSection: 1,
            });
          } else {
            this.setState({
              isUrlLoading: false,
              urlError: res.data.feedbackMsg,
            });
          }
        } else {
          this.setState({ isUrlLoading: false, urlError: res.msg });
        }
      } else {
        this.setState({ isUrlLoading: false, urlError: res.msg });
      }
    } else {
      this.setState({ urlError: 'Please enter url' });
    }
  }

  async handleSentrySubmit(values) {
    console.log('Received values of form: ', values);

    let notificationDic = {};
    this.state.notificationList.map(
      (notification) => (notificationDic[notification.name] = notification.id)
    );

    let sentryName = values['sentryName'];
    let notificationMethod = values['notificationMethod'];

    const { url } = this.state;
    let { x, y, width, height } = this.state.crop;

    x = Math.round(x * this.state.screenshotScaleX);
    y = Math.round(y * this.state.screenshotScaleY);
    width = Math.round(width * this.state.screenshotScaleX);
    height = Math.round(height * this.state.screenshotScaleY);

    this.setState({ isFormLoading: true, error: null });

    let res = await api.createSentry(
      sentryName,
      url,
      x,
      y,
      width,
      height,
      notificationDic[notificationMethod]
    );
    if (res.code === api.code.ok) {
      this.setState({ isFormLoading: false, currentSection: 2 });
    } else {
      this.setState({ isFormLoading: false });
      this.setState({ error: 'Failed to create a new sentry: ' + res.msg });
    }
  }

  renderUrlSection() {
    return (
      <div className="p-6">
        <Row>
          <Title level={3}> Enter an URL to create a new task </Title>
        </Row>
        <Search
          className="mt-3"
          placeholder="Enter website: https://www.google.com"
          enterButton="Go"
          size="large"
          onChange={this.urlOnChange}
          value={this.state.url}
          onSearch={this.handleUrlSubmit}
        />
        {this.state.urlError ? (
          <div className="red mt-1">{this.state.urlError}</div>
        ) : null}
      </div>
    );
  }

  renderCropSection() {
    const { crop, screenshotLink, notificationList } = this.state;
    const formItemLayout = {
      labelCol: {
        lg: { span: 6 },
        md: { span: 8 },
        sm: { span: 12 },
      },
      wrapperCol: {
        lg: { span: 18 },
        md: { span: 16 },
        sm: { span: 12 },
      },
    };
    return (
      <div>
        <Form {...formItemLayout} onFinish={this.handleSentrySubmit}>
          <Card title="Sentry Basic Info" style={{ borderRadius: 10 }}>
            <Form.Item
              label="Sentry Name"
              name="sentryName"
              rules={[
                {
                  required: true,
                  message: 'Please input a name for the new sentry!',
                },
              ]}
            >
              <Input size="large" style={{ maxWidth: '80%' }} />
            </Form.Item>
            <Form.Item label="Crop">
              <ReactCrop
                src={screenshotLink}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
                keepSelection={true}
                style={{ maxWidth: '80%' }}
              />
            </Form.Item>
            <Form.Item
              label="Notification Method"
              name="notificationMethod"
              rules={[
                {
                  required: true,
                  message: 'Please input a notification method',
                },
              ]}
            >
              <Select
                size="large"
                style={{ maxWidth: '80%' }}
                onSelect={this.notifyMethodOnChange}
              >
                <OptGroup label="Email">
                  {notificationList
                    .filter((n) => n.type === 'email')
                    .map((n) => {
                      return (
                        <Option value={n.name} key={n.id}>
                          {n.name}
                        </Option>
                      );
                    })}
                </OptGroup>
                <OptGroup label="ServerChan">
                  {notificationList
                    .filter((n) => n.type === 'serverchan')
                    .map((n) => {
                      return (
                        <Option value={n.name} key={n.id}>
                          {n.name}
                        </Option>
                      );
                    })}
                </OptGroup>
              </Select>
            </Form.Item>
          </Card>
          {this.state.error ? (
            <div className="red mt-1">{this.state.error}</div>
          ) : null}
          <BottomNav
            goBack={this.goUrlSection}
            // goNext={this.handleSentrySubmit}
            loading={this.state.isFormLoading}
            goBackButtonText={'Back'}
            goNextButtonText={'Submit'}
          />
        </Form>
      </div>
    );
  }

  renderCompleteSection() {
    return (
      <div className="p-6">
        <Row className="mt-8 px-7">
          <Row
            justify={'center'}
            type={'flex'}
            align={'middle'}
            style={{ margin: 'auto' }}
          >
            <Title level={2}>Congradulations! All done!</Title>
          </Row>
          <Row className="reponsive-bottom-nav">
            <BottomNav
              goBack={this.goDashboard}
              goNext={this.resetState}
              goBackClassName={'bottom-nav-left-responsive'}
              goNextClassName={'bottom-nav-right-responsive'}
              goBackButtonText={'Close'}
              goNextButtonText={'Create Another'}
            />
          </Row>
        </Row>
      </div>
    );
  }

  renderSection() {
    const { isUrlLoading, currentSection } = this.state;
    if (isUrlLoading) {
      return (
        <Row className="mt-8" justify={'center'} type={'flex'} align={'middle'}>
          <Spin size="large" />
        </Row>
      );
    }
    if (currentSection === 1) {
      return this.renderCropSection();
    } else if (currentSection === 2) {
      return this.renderCompleteSection();
    }
    return this.renderUrlSection();
  }

  render() {
    let urlIcon = null;
    let cropIcon = null;
    let doneIcon = null;
    if (this.state.isUrlLoading) {
      urlIcon = <LoadingOutlined />;
    }
    if (this.state.isFormLoading) {
      cropIcon = <LoadingOutlined />;
    }
    if (this.state.currentSection === 2) {
      doneIcon = <SmileOutlined />;
    }
    return (
      <div>
        <DashboardLayout page="home">
          <Steps current={this.state.currentSection} className="my-3 px-5">
            <Step title="Enter an url" icon={urlIcon} />
            <Step title="Crop and enter basic info" icon={cropIcon} />
            <Step title="Done" icon={doneIcon} />
          </Steps>
          <div className="p-5">{this.renderSection()}</div>
        </DashboardLayout>
      </div>
    );
  }
}

export default injectIntl(NewSentry);

import React, { Component } from 'react';
import { Input, Row, Typography, Spin, Icon, Card, Select, Form, Steps} from 'antd';
import ReactCrop from 'react-image-crop';
import BottomNav from './BottomNav';
import 'react-image-crop/dist/ReactCrop.css';
import api from '../../../helpers/Api.js';
import './NewSentry.less';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;
const { Step } = Steps;

const initialState = {
  error:null,
  urlError:null,
  currentSection:0,
  isFormLoading:false,     // form loading
  isUrlLoading:false,        // url loading
  url:"",
  name:"",
  screenshotLink: "",
  crop: {
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50
  },
  scaleX: 0,
  scaleY: 0
}

class NewSentry extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.loadData();
    this.urlOnchange = e => {this.onSentryValueChange("url", e.target.value);};
    this.onCropComplete = val => {this.onSentryValueChange("crop", val);};
    this.goUrlSection = () => {this.setState({ currentSection: 0});};
    this.goCropSection = () => {this.setState({ currentSection: 1});};
    this.goInfoSection = () => {this.setState({ currentSection: 2});};
    this.resetState = () => { this.setState(initialState); };
    this.goDashboard = () => { props.history.push('/dashboard'); };
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
    this.handleSentrySubmit = this.handleSentrySubmit.bind(this);
    this.onCropChange = this.onCropChange.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
  }

  async loadData() {
    const response = await api.getAllNotifications();

    console.log(response);
    if (response.code === api.code.ok) {
      this.setState({
        notificationList: response.data.notifications
      });
    } else {
      console.log("---- Error ----");
      console.log(response);
    }
  }

  setSectionVisibility = (urlSection, cropSection, infoSection) => {
    this.setState({
      showUrlSection: urlSection,
      showCropSection: cropSection,
      showInfoSection: infoSection
    });
  }

  onSentryValueChange = (key, val) => {
    console.log(key,val);
    this.setState({[key]: val });
  }

  onCropChange = (_, percentCrop) => {
    this.setState({ crop: percentCrop })
  }

  onImageLoaded = image => {
    console.log('onImageLoaded', image);
    this.setState({
      screenshotScaleX: image.naturalWidth / 100,
      screenshotScaleY: image.naturalHeight / 100
    });
  }

  async handleUrlSubmit(url,event) {
    event.preventDefault();
    if (url) {
      this.setState({ isUrlLoading: true , urlError: null });
      let res = await api.requestFullScreenshot(this.state.url);
      console.log(res);
      if (res.code === api.code.ok) {
          let sentryId = res.data.taskId;
          res = await api.waitFullScreenshot(sentryId);
          console.log(res);
          if (res.code === api.code.ok) {
            this.setState(
              {
                isUrlLoading: false,
                screenshotLink:
                  api.getFullScreenshotLink(sentryId, res.data.imageToken),
                currentSection: 1
              }
            );
          } else {
            this.setState({ isUrlLoading: false, urlError: res.msg  });
          }
      } else {
        this.setState({ isUrlLoading: false, urlError: res.msg  });
      }
    } else {
      this.setState({ urlError: "Please enter url"  });
    }
  }

  async handleSentrySubmit() {
    const { form } = this.props;

    form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if(err){
        return;
      }
    });

    let notificationDic = {};
    this.state.notificationList.map( notification =>
      notificationDic[notification.name] = notification.id
    );
    const { sentryName, notificationMethod } = form.getFieldsValue();
    const { url } = this.state;
    let { x, y, width, height } = this.state.crop;

    x = Math.round(x * this.state.screenshotScaleX);
    y = Math.round(y * this.state.screenshotScaleY);
    width = Math.round(width * this.state.screenshotScaleX);
    height = Math.round(height * this.state.screenshotScaleY);

    this.setState({ isFormLoading: true, error: null });
    console.log(sentryName, url, x, y,
                          width, height, notificationDic[notificationMethod]);
    let res = await api.createSentry(sentryName, url, x, y,
                          width, height, notificationDic[notificationMethod]);
    console.log(res);
    if (res.code === api.code.ok) {
      this.setState({ isFormLoading: false, currentSection: 2 });
    } else {
      this.setState({ isFormLoading: false });
      this.setState({ error: "Failed to create a new sentry!" });
    }
  }

  renderUrlSection() {
    console.log("??");
    return (
      <div>
        <Row>
          <Title level={3}> Enter an URL to create a new task </Title>
        </Row>
        <Search
           className = "mt-3"
           placeholder="Enter website: https://www.google.com"
           enterButton="Go"
           size="large"
           onChange={this.urlOnchange}
           value={this.state.url}
           onSearch={this.handleUrlSubmit}
        />
        {this.state.urlError?<div className="red mt-1">{this.state.urlError}</div>:null}
      </div>
    )
  }

  renderCropSection() {
    const { crop, screenshotLink, notificationList } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 40 },
        sm: { span: 20 },
      },
    };

    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Card title="Sentry Basic Info" style={{ borderRadius: 10 }} >
            <Form.Item label="Sentry Name">
              {getFieldDecorator('sentryName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input a name for the new sentry!',
                  },
                ],
              })(<Input size="large"/>)}
            </Form.Item>
            <Form.Item label="Crop">
              <ReactCrop
                src={screenshotLink}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
                keepSelection={true}
              />
            </Form.Item>
            <Form.Item label="Notification Method">
              {getFieldDecorator('notificationMethod', {
                initialValue:notificationList[0].name,
                rules: [
                  {
                    required: true,
                    message: 'Please input a notification method',
                  },
                ],
              })(
                <Select
                  size="large"
                  style={{ width: '50%' }}
                  onSelect={this.notifOnchange}
                >
                  {notificationList.map( notification => {
                    return (
                      <Option value={notification.name} key={notification.id}>
                        {notification.name}
                      </Option>)
                  })}
                </Select>
              )}
            </Form.Item>
          </Card>
          {this.state.error?<div className="red mt-1">{this.state.error}</div>:null}
          <BottomNav
            goBack = {this.goUrlSection}
            goNext = {this.handleSentrySubmit}
            loading = {this.state.isFormLoading}
            goBackButtonText = {"Back"}
            goNextButtonText = {"Sumbit"}
          />
        </Form>
      </div>
    )
  }

  renderCompleteSection() {
    return (
      <Row className="mt-8 px-7" >
        <Row justify={"center"} type = {"flex"} align={"middle"}>
          <Title level={2}>Congradulations! All done!</Title>
        </Row>
        <Row className="px-8">
          <BottomNav
            goBack = {this.goDashboard}
            goNext = {this.resetState}
            goBackButtonText = {"Close"}
            goNextButtonText = {"Create Another"}
          />
        </Row>

      </Row>
    )
  }

  renderSection() {
    const { isUrlLoading, currentSection } = this.state;
    if(isUrlLoading) {
      return(
        <Row className="mt-8" justify={"center"} type = {"flex"} align={"middle"}>
           <Spin size="large"/>
        </Row>
      )
    }
    if(currentSection === 1) {
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
    if(this.state.isUrlLoading) {urlIcon = <Icon type="loading" />;};
    if(this.state.isFormLoading) { cropIcon = <Icon type="loading" />; };
    if(this.state.currentSection === 2) { doneIcon = <Icon type="smile-o" />; };

    return (
      <div>
        <Steps current={this.state.currentSection} className = "my-3 px-5">
          <Step title="Enter an url" icon={urlIcon}/>
          <Step title="Crop and enter basic info" icon={cropIcon} />
          <Step title="Done" icon={doneIcon}/>
        </Steps>
        <div className = "cropHeight p-6">
          {this.renderSection()}
        </div>
      </div>

    );
  }
}

export default Form.create()(NewSentry);

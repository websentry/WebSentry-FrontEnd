import React, { Component } from 'react';
import { Input, Row, Typography, Spin, Icon, Card, Select, Form} from 'antd';
import ReactCrop from 'react-image-crop';
import BottomNav from './BottomNav';
import 'react-image-crop/dist/ReactCrop.css';
import api from '../../../helpers/Api.js';
import './NewSentry.less';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;


const initialState = {
  error:null,
  urlError:null,
  showUrlSection:true,
  showCropSection:false,
  showInfoSection:false,
  isFormLoading:false,     // form loading
  isUrlLoading:false,        // url loading
  submit:"Submit",
  next:"Next",
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
    console.log(props);
    this.urlOnchange = e => {this.onSentryValueChange("url", e.target.value);};
    this.onCropComplete = val => {this.onSentryValueChange("crop", val);};
    this.goUrlSection = () => {
      this.setSectionVisibility(true, false, false);
    };
    this.goCropSection = () => {
      this.setSectionVisibility(false, true, false);
    };
    this.goInfoSection = () => {
      this.setSectionVisibility(false, false, true);
    };
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
    this.handleSentrySubmit = this.handleSentrySubmit.bind(this);
    this.onCropChange = this.onCropChange.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
  }

  componentDidMount() {
    if(this.props.notificationList[0] == null) {
      this.setState({ error: "Failed to load notification list" });
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
                screenshotLink:
                  api.getFullScreenshotLink(sentryId, res.data.imageToken),
                showUrlSection: false,
                showCropSection: true,
                showInfoSection: false,
              }
            );
          } else {
            this.setState({ isUrlLoading: false, urlError: res.msg  });
          }
      } else {
        this.setState({ isUrlLoading: false, urlError: res.msg  });
      }
      this.setState({ isUrlLoading: false });
    } else {
      this.setState({ urlError: "Please enter url"  });
    }
  }

  async handleSentrySubmit() {
    const { notificationList, form } = this.props;

    form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if(err){
        return;
      }
    });

    let notificationDic = {};
    notificationList.map( notification =>
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
      this.setState({ isFormLoading: false });
      // this.setState({ submit: "Success!" });
      window.location.reload();
    } else {
      this.setState({ isFormLoading: false });
      this.setState({ error: "Failed to create a new sentry!" });
    }
  }

  renderSection() {
    const { crop, showCropSection, showInfoSection, screenshotLink, isUrlLoading } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 60 }} spin />;
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

    if(isUrlLoading) {
      return(
        <Row justify={"center"} type = {"flex"} align={"middle"}>
           <Spin indicator={antIcon} size="large"/>
        </Row>
      )
    }
    if(showCropSection) {
      return(
        <div>
          <Row justify={"center"} type = {"flex"} align={"middle"}>
            <ReactCrop
              src={screenshotLink}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
              keepSelection={true}
            />
          </Row>
          <BottomNav
            goBack = {this.goUrlSection}
            goNext = {this.goInfoSection}
            goNextButton = {this.state.next}
          />
        </div>
      )
    } else if(showInfoSection) {
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
              <Form.Item label="Notification Method">
                {getFieldDecorator('notificationMethod', {
                  initialValue:this.props.notificationList[0].name,
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
                    {this.props.notificationList.map( notification => {
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
              goBack = {this.goCropSection}
              goNext = {this.handleSentrySubmit}
              loading = {this.state.isFormLoading}
              goNextButton = {this.state.submit}
            />
          </Form>
        </div>
      )
    }
    return (
      <div>
        <Row>
          <Title level={3}> Enter an URL to create a new task </Title>
        </Row>
        <Search
           className = "mt-3"
           placeholder="Enter website: https://www.google.com"
           enterButton="Search"
           size="large"
           onChange={this.urlOnchange}
           value={this.state.url}
           onSearch={this.handleUrlSubmit}
        />
        {this.state.urlError?<div className="red mt-1">{this.state.urlError}</div>:null}
      </div>
    )
  }

  render() {
    return (
      <div className = "cropHeight p-6">
        {this.renderSection()}
      </div>
    );
  }
}

export default Form.create()(NewSentry);

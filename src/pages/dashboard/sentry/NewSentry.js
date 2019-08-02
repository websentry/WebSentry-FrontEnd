import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {  Input,
          Spin,
          Icon,
          Select,
          Col,
          Row,
          PageHeader,
          Divider,
          Button } from 'antd';
import api from '../../../helpers/Api.js';
import "./NewSentry.less";

const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;
const initialState = {
  error:null,
  urlError:null,
  isFormLoading:false,     // form loading
  isUrlLoading:false,        // url loading
  okText:"Submit",
  okButtonProps:{
    disabled: false
  },
  url:"",
  name:"",
  notification:null,
  notificationId:null,
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

  constructor(props){
    super(props);
    this.state = initialState;
    this.urlOnchange = e => {this.onSentryValueChange("url", e.target.value);};
    this.nameOnchange = e => {this.onSentryValueChange("name", e.target.value);};
    this.notifOnchange = (value, e) => {
      this.onSentryValueChange("notification", value);
      this.onSentryValueChange("notificationId", e.key);
    };
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
    this.handleSentrySubmit = this.handleSentrySubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    if(this.props.notificationList[0] == null) {
      this.setState({ error: "Failed to load notification list" });
    } else {
      this.setDefaultNotification();
    }
  }

  onSentryValueChange(key,val) {
    console.log(key,val);
    this.setState({[key]: val });
  }

  setDefaultNotification() {
    this.setState({ notification: this.props.notificationList[0].type });
    this.setState({ notificationId: this.props.notificationList[0]._id });
  }

  onCancel() {
    this.props.hideCreateSentry();
    this.setState(initialState);
    this.setDefaultNotification();
  }

  onImageLoaded = image => {
    console.log('onImageLoaded', image);
    this.setState({
      screenshotScaleX: image.naturalWidth / 100,
      screenshotScaleY: image.naturalHeight / 100
    });
  }

  onCropChange = (_, percentCrop) => {
    this.setState({ crop: percentCrop })
  }

  async handleUrlSubmit(url,event) {
    event.preventDefault();
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
                api.getFullScreenshotLink(sentryId, res.data.imageToken)
            }
          );
        } else {
          this.setState({ isUrlLoading: false, urlError: res.msg  });
        }
    } else {
      this.setState({ isUrlLoading: false, urlError: res.msg  });
    }
    this.setState({ isUrlLoading: false });
  }

  async handleSentrySubmit() {
    const { name, url, notificationId } = this.state;
    let { x, y, width, height } = this.state.crop;

    x = Math.round(x * this.state.screenshotScaleX);
    y = Math.round(y * this.state.screenshotScaleY);
    width = Math.round(width * this.state.screenshotScaleX);
    height = Math.round(height * this.state.screenshotScaleY);

    this.setState({ isFormLoading: true, error: null });
    let res = await api.createSentry(name, url, x, y,
                                        width, height, notificationId);
    console.log(res);
    if (res.code === api.code.ok) {
      this.setState({ isFormLoading: false });
      this.setState({ okButtonProps: { disabled: true }});
      this.setState({ okText: "Success!" });
      setTimeout(() => { this.props.onCloseModal(); }, 1000);
      setTimeout(() => {
        this.setState(initialState);
        this.setDefaultNotification();
      }, 1000);
      window.location.reload();
    } else {
      this.setState({ isFormLoading: false });
      this.setState({ error: "Failed to create a new sentry!" });
    }
  }

  renderCrop() {
    const { crop, screenshotLink, isUrlLoading } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    if(isUrlLoading) {
      return(
        <Row justify={"center"} type = {"flex"} align={"middle"}>
           <Spin indicator={antIcon} size="large"/>
        </Row>
      )
    }
    if(screenshotLink) {
      return(
        <Row justify={"center"} type = {"flex"} align={"middle"}>
          <ReactCrop
            src={screenshotLink}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.props.onCropComplete}
            onChange={this.onCropChange}
            keepSelection={true}
          />
        </Row>
      )
    }
    return(
      <div className="jumbotron fixedHeight">
      </div>
    )
  }


  render() {
    return (
      <div>
        <PageHeader title="New Sentry" />
        <Divider />
        <div className="pl-5 pr-5">
          <div className="mt-2">
            <Search
               placeholder="Enter website: https://www.google.com"
               enterButton="Search"
               size="large"
               value={this.state.url}
               onChange={this.urlOnchange}
               onSearch={this.handleUrlSubmit}
            />
            {this.state.urlError?<div className="red mt-1">{this.state.urlError}</div>:null}
          </div>
          <div className="mt-3 mb-3">
            {this.renderCrop()}
          </div>
          <InputGroup compact>
            <Input
              size="large"
              style={{ width: '70%' }}
              value={this.state.name}
              onChange={this.nameOnchange}
              placeholder="Enter sentry name: Google Banner"
            />
              <Select
                size="large"
                style={{ width: '30%' }}
                defaultValue = {this.props.notificationList[0].type}
                onSelect={this.notifOnchange}
              >
                {this.props.notificationList.map( notification => {
                  return (
                    <Option value={notification.name} key={notification.id}>
                      {notification.name}
                    </Option>)
                })}
              </Select>
            </InputGroup>
            {this.state.error?<div className="red mt-1">{this.state.error}</div>:null}
            <Row style={{ marginTop: 10 }}>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Button
                  type="primary"
                  onClick={this.handleSentrySubmit}
                  loading={this.state.isFormLoading}
                  size="large"
                >
                  Submit
                </Button>
                {this.state.isFormLoading?null:
                  <Button style={{ marginLeft: 8 }} onClick={this.onCancel} size="large">
                    Cancel
                  </Button>
                }
              </Col>
            </Row>
          </div>
        </div>
    );
  }
}

export default NewSentry;

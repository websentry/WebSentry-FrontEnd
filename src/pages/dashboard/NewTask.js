import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Input, Spin, Icon, Select, Modal } from 'antd';
import api from '../../helpers/Api.js';

const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;
const initialState = {
  error:null,
  isFormLoading: false,     // form loading
  isUrlLoading:false,        // url loading
  okText:"Submit",
  okButtonProps:{
    disabled: false
  },
  url:"",
  name:"",
  notification:null,
  notificationId:null,
  screenshotLink: "https://www.hospitalityinhealthcare.com/wp-content/uploads/2017/03/1-WELCOME-IMAGE_medical-personnel-consult.jpg",
  crop: {
    unit: "%",
    width: 30
  }
}

class NewTask extends Component {
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

  onSentryValueChange(key,val) {
    this.setState({[key]: val });
  }

  setDefaultNotification(){
    this.setState({ notification: this.props.notificationList[0].type });
    this.setState({ notificationId: this.props.notificationList[0]._id });
  }

  componentDidMount() {
    if(this.props.notificationList[0] == null){
      this.setState({ error: "Failed to load notification list" });
    }else{
      this.setDefaultNotification();
    }
  }

  onImageLoaded = image => {
    console.log('onImageLoaded', image)
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  async handleUrlSubmit(url,event) {
    event.preventDefault();
    this.setState({ isUrlLoading: true });
    let res = await api.requestFullScreenshot(this.state.url);
    console.log(res);
    if (res.code === api.code.ok) {
        let taskId = res.data.taskId;
        res = await api.waitFullScreenshot(taskId);
        console.log(res);
        if (res.code === api.code.ok) {
          this.setState(
            {
              screenshotLink:
                api.getFullScreenshotLink(taskId, res.data.imageToken)
            }
          );
        }
    }
    this.setState({ isUrlLoading: false });
  }

  onCancel(){
    this.props.onCloseModal();
    this.setState(initialState);
    this.setDefaultNotification();
  }

  async handleSentrySubmit(){
    const { name, url, notificationId } = this.state;
    const { x, y, width, height } = this.state.crop;

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
      this.setState({ error: "Failed to create a new task!" });
    }
  }

  renderCrop() {
    const { crop, screenshotLink, isUrlLoading } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    if(isUrlLoading) {
      return(
        <div className="container mt-4">
          <div className="d-flex justify-content-center">
              <Spin indicator={antIcon} size="large"/>
          </div>
        </div>
      )
    }
    if(screenshotLink) {
      return(
        <div className = "mt-3 mb-2">
          <ReactCrop
            src={screenshotLink}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.props.onCropComplete}
            onChange={this.onCropChange}
          />
        </div>
      )
    }
    return(
      <div className="jumbotron mt-3 fixedHeight mb-2">
      </div>
    )
  }

  render() {
    return (
      <Modal
        title="Create New Task"
        visible={this.props.visible}
        onOk={this.handleSentrySubmit}
        onCancel={this.onCancel}
        confirmLoading={this.state.isFormLoading}
        okText={this.state.okText}
        okButtonProps={this.state.okButtonProps}
      >
        <div className="container mt-2">
          <Search
             placeholder="Enter website: www.google.com"
             enterButton="Search"
             size="large"
             value={this.state.url}
             onChange={this.urlOnchange}
             onSearch={this.handleUrlSubmit}
          />
            {this.renderCrop()}
          <InputGroup compact>
            <Input
              size="large"
              style={{ width: '70%' }}
              value={this.state.name}
              onChange={this.nameOnchange}
              placeholder="Enter name: John"
            />
            <Select
              size="large"
              style={{ width: '30%' }}
              defaultValue = {this.props.notificationList[0].type}
              onSelect={this.notifOnchange}
            >
              {this.props.notificationList.map( notification => {
                return (
                  <Option value={notification.type} key={notification._id}>
                    {notification.type}
                  </Option>)
              })}
            </Select>
          </InputGroup>
          {this.state.error?<div className="text-danger mt-1">{this.state.error}</div>:null}
        </div>
      </Modal>
    );
  }
}

export default NewTask;

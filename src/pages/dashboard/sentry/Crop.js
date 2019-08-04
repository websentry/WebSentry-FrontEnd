import React, { Component } from 'react';
import { Input, Row, Typography, Spin, Icon } from 'antd';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import api from '../../../helpers/Api.js';


const { Title } = Typography;
const { Search } = Input;

const initialState = {
  urlError:null,
  isUrlLoading:false,        // url loading
  okText:"Submit",
  okButtonProps:{
    disabled: false
  },
  url:"",
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

class Crop extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    console.log(props);
    this.urlOnchange = e => {this.onSentryValueChange("url", e.target.value);};
    this.onCropComplete = val => {this.onSentryValueChange("crop", val);};
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
    this.onCropChange = this.onCropChange.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
  }

  onSentryValueChange = (key,val) => {
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
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
            keepSelection={true}
          />
        </Row>
      )
    }
  }

  render() {
    return (
      <div className = "cropHeight p-6">
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
        <div className="mt-5">
          {this.renderCrop()}
        </div>
      </div>
    );
  }
}

export default Crop;

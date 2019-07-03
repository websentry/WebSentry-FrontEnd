import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Input, Spin, Icon  } from 'antd';
import Api from '../../helpers/Api.js';

const { Search } = Input;

class NewTask extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      url:"",
      isLoading:false,
      screenshotLink: "https://www.hospitalityinhealthcare.com/wp-content/uploads/2017/03/1-WELCOME-IMAGE_medical-personnel-consult.jpg",
      crop: {
        unit: "%",
        width: 30
      }
    };

    this.urlOnchange = this.urlOnchange.bind(this);
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
    this.onLoading = this.onLoading.bind(this);
    this.cancelLoading = this.cancelLoading.bind(this);
  }

  onLoading() {
    this.setState({ isLoading: true });
  }

  cancelLoading() {
    this.setState({ isLoading: false });
  }

  urlOnchange(event) {
    this.setState({ url: event.target.value});
  }

  onImageLoaded = image => {
    console.log('onImageLoaded', image)
  }

  onCropComplete = crop => {
    console.log('onCropComplete', crop)
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  async handleUrlSubmit(url,event) {
    event.preventDefault();
    this.onLoading();
    let res = await Api.requestFullScreenshot(this.state.url);
    console.log(res);
    if (res.code === Api.code.ok) {
        let taskId = res.data.taskId;
        res = await Api.waitFullScreenshot(taskId);
        console.log(res);
        if (res.code === Api.code.ok) {
          this.setState(
            {
              screenshotLink:
                Api.getFullScreenshotLink(taskId, res.data.imageToken)
            }
          );
        }
    }
    this.cancelLoading();
  }

  renderCrop() {
    const { crop, screenshotLink, isLoading } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    if(isLoading) {
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
        <div className = "mt-3">
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
      <div className="jumbotron mt-3 fixedHeight">
      </div>
    )
  }

  render() {
    return (
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
      </div>
    );
  }
}

export default NewTask;

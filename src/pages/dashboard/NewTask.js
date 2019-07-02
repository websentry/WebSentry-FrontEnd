import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Input } from 'antd';
import Api from '../../helpers/Api.js';
const { Search } = Input;

class NewTask extends Component {
  constructor(props){
    super(props);
    this.state = {
      url:"",
      loading:false,
      screenshotLink: null,
      crop: {
        unit: "%",
        width: 30
      }
    };

    this.urlOnchange = this.urlOnchange.bind(this);
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
  }

  urlOnchange(event){
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
    let res = await Api.requestFullScreenshot(this.state.url);
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
  }

  renderCrop() {
    const { crop, screenshotLink } = this.state;
    if(screenshotLink) {
      return(
        <div className = "mt-3">
          <ReactCrop
            src={screenshotLink}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        </div>

      )
    }
    return(
      <div className="jumbotron mt-3 fixedHeight"></div>
    )
  }

  render() {
    const { croppedImageUrl } = this.state;

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
          {croppedImageUrl && (
            <img alt="Crop" crossOrigin="Anonymous" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
          )}
      </div>
    );
  }
}

export default NewTask;

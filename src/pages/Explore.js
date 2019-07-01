import React, { Component } from 'react';
import AppLayout from '../layouts/AppLayout';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './Explore.less';
import {
  Layout,
  Breadcrumb
} from 'antd';
import Api from '../helpers/Api.js';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url:"",
      loading:false,
      screenshotLink: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 9
      }
    };

    this.urlOnchange = this.urlOnchange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  urlOnchange(event){
    // console.log(this.state);
    this.setState({ url: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    let res = await Api.requestFullScreenshot(this.state.url);
    let taskId = res.data.taskId;
    if (res.code === Api.code.ok) {
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

  onImageLoaded = image => {
    console.log('onImageLoaded', image)
  }

  onCropComplete = crop => {
    console.log('onCropComplete', crop)
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  renderCrop() {
    const { crop, croppedImageUrl, screenshotLink } = this.state;
    if(screenshotLink) {
      return(
        <ReactCrop
        src={screenshotLink}
        crop={crop}
        onImageLoaded={this.onImageLoaded}
        onComplete={this.onCropComplete}
        onChange={this.onCropChange}
      />)}
      else{
        return(
          <div className="jumbotron mb-3 fixedHeight"></div>
        )
      }
  }

  render() {
    const backgroundImage3 = "https://www.hospitalityinhealthcare.com/wp-content/uploads/2017/03/1-WELCOME-IMAGE_medical-personnel-consult.jpg";
    const { crop, croppedImageUrl, screenshotLink } = this.state;

    return (
      <AppLayout>
        <div className="container mt-5">
          <div className="jumbotron">
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          </div>
          <div className="input-group mb-3">
            <input type="text" className="form-control form-control-lg" placeholder="Enter website: www.google.com" value={this.state.url} onChange={this.urlOnchange}/>
            <div className="input-group-append">
              <button type="button" className="btn btn-primary btn-lg" onClick={this.handleSubmit}>Large button</button>
            </div>
          </div>
            {this.renderCrop()}
            {croppedImageUrl && (
              <img alt="Crop" crossOrigin="Anonymous" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
            )}
          <div className="input-group mt-2 mb-3">
            <input type="text" className="form-control form-control-lg" placeholder="me@example.com" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <div className="input-group-append">
              <button type="button" className="btn btn-primary btn-lg">Large button</button>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }
}

export default App;

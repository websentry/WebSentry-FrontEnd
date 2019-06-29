import React, { Component } from 'react';
import AppLayout from '../layouts/AppLayout';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './Explore.less';
import {
  Layout,
  Breadcrumb
} from 'antd';

const { Header, Content, Footer } = Layout;

class App extends React.Component {

  state = {
    src: "https://www.hospitalityinhealthcare.com/wp-content/uploads/2017/03/1-WELCOME-IMAGE_medical-personnel-consult.jpg",
    crop: {
      unit: "%",
      width: 30,
      aspect: 16 / 9
    }
  };

  onImageLoaded = image => {
    console.log('onCropComplete', image)
  }

  onCropComplete = crop => {
    console.log('onCropComplete', crop)
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  renderCrop() {
    const { crop, croppedImageUrl, src } = this.state;
    if(src) {
      return(
        <ReactCrop
        src={src}
        crop={crop}
        onImageLoaded={this.onImageLoaded}
        onComplete={this.onCropComplete}
        onChange={this.onCropChange}
      />)}
      else{
        return(
          <div class="jumbotron mb-3 fixedHeight"></div>
        )
      }
  }

  render() {
    const backgroundImage3 = "https://www.hospitalityinhealthcare.com/wp-content/uploads/2017/03/1-WELCOME-IMAGE_medical-personnel-consult.jpg";
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <AppLayout>
        <div class="container mt-5">
          <div class="jumbotron">
            <h1 class="display-4">Hello, world!</h1>
            <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          </div>
          <div class="input-group mb-3">
            <input type="text" class="form-control form-control-lg" placeholder="Enter website: www.google.com" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <div class="input-group-append">
              <button type="button" class="btn btn-primary btn-lg">Large button</button>
            </div>
          </div>
            {this.renderCrop()}
            {croppedImageUrl && (
              <img alt="Crop" crossOrigin="Anonymous" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
            )}
          <div class="input-group mt-2 mb-3">
            <input type="text" class="form-control form-control-lg" placeholder="me@example.com" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <div class="input-group-append">
              <button type="button" class="btn btn-primary btn-lg">Large button</button>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }
}

export default App;

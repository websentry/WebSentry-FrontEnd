import React from 'react';
import AppLayout from '../layouts/AppLayout';
import ReactCrop from 'react-image-crop';
import { UserContext } from '../UserContext';
import 'react-image-crop/dist/ReactCrop.css';
import './Explore.less';
import Api from '../helpers/Api.js';

class App extends React.Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  async handleSubmit(event) {
    event.preventDefault();
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

  renderCrop() {
    const { crop, screenshotLink } = this.state;
    if(screenshotLink) {
      return(
        <ReactCrop
          src={screenshotLink}
          crop={crop}
          onImageLoaded={this.onImageLoaded}
          onComplete={this.onCropComplete}
          onChange={this.onCropChange}
        />
      )
    }
    return(
      <div className="jumbotron mb-3 fixedHeight"></div>
    )
  }

  render() {
    const { croppedImageUrl } = this.state;

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

import React, { Component } from 'react';
import Crop from './Crop';
import './NewSentry.less';

class Explore extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Crop/>
      </div>
    );
  }
}

export default Explore;

import React, { Component } from 'react';
import { Empty } from 'antd';

class NoMatch extends Component {
  render() {
    return (
      <Empty 
        description={
          <span>
            404
          </span>
        }
      />
    );
  }
}

export default NoMatch;

import React, { Component } from 'react';
import { Result } from 'antd';
import AppLayout from '../layouts/AppLayout';

class NoMatch extends Component {
  render() {
    return (
      <AppLayout>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          style={{ paddingTop: "20vh" }}
        />
      </AppLayout>
    );
  }
}

export default NoMatch;

import React, { Component } from 'react';
import { Tabs } from 'antd';
import Explore from './Explore';
import Home from './Home';

const { TabPane } = Tabs;

class Container extends Component {

  render() {
    return(
      <Tabs type="card">
        <TabPane tab="Dashboard" key="dashboard" >
          <Home/>
        </TabPane>
        <TabPane tab="Explore" key="explore">
          <Explore/>
        </TabPane>
      </Tabs>
    );
  }
}

export default Container;

import React, { Component } from 'react';
import { Spin } from 'antd';
import Container from './dashboard/Container';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';
import './Dashboard.less';

class Dashboard extends Component {

  renderMain(isLoading, isLoggedIn) {
    if (isLoading) {
      return (
      <div className="loading-spin-center">
        <Spin size="large" spinning={true} />
      </div>)
    } else {
      if (isLoggedIn) {
        return (<Container />)
      } else {
        // TODO: pass the current url so it can jump back to this precise page after logged in
        return (<Redirect to='/login' />)
      }
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        { ({isLoading, isLoggedIn}) => {
            return (
              <div>
                {this.renderMain(isLoading, isLoggedIn)}
              </div>
            )
        }}
      </UserContext.Consumer>
    );
  }
}

export default Dashboard;

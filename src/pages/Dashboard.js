import React, { Component } from 'react';
import { Spin } from 'antd';
import Container from './dashboard/Container';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';
import './Dashboard.less';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.prop = props;
  }

  renderMain(isLoading, isLoggedIn) {
    const { pathname } = this.prop.location;
    if (isLoading) {
      return (
        <div className="loading-spin-center">
          <Spin size="large" spinning={true} />
        </div>
      );
    } else {
      if (isLoggedIn) {
        return <Container />;
      } else {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { referrer: pathname },
            }}
          />
        );
      }
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ isLoading, isLoggedIn }) => {
          return <div>{this.renderMain(isLoading, isLoggedIn)}</div>;
        }}
      </UserContext.Consumer>
    );
  }
}

export default Dashboard;

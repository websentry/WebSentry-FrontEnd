import React, { Component } from 'react';
import { Spin } from 'antd';
import Container from './dashboard/Container';
import DashboardLayout from '../layouts/DashboardLayout';
import { UserContext } from '../UserContext';
import './Dashboard.less';

class Dashboard extends Component {

  renderMain(isLoggedIn) {
    if (isLoggedIn) {
      return (
        <DashboardLayout>
          <Container/>
        </DashboardLayout>
      )
    };
    return (
      <div>
        Need Login.
      </div>
    )
  }

  render() {
    return (
      <UserContext.Consumer>
        { ({isLoading, isLoggedIn, userEmail, toggleRefreash}) => {
            return (
              <div>
                <div className="loading-spin-center">
                  <Spin size="large" spinning={isLoading} />
                </div>
                {this.renderMain(isLoggedIn)}
              </div>
            )
        }}
      </UserContext.Consumer>
    );
  }
}

export default Dashboard;

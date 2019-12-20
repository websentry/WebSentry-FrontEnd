import React, { Component } from 'react';
import { Spin } from 'antd';
import Container from './dashboard/Container';
import DashboardLayout from '../layouts/DashboardLayout';
import AppLayout from '../layouts/AppLayout';
import { UserContext } from '../UserContext';
import './Dashboard.less';

class Dashboard extends Component {

  renderMain(isLoggedIn) {
    if (isLoggedIn) {
      return (
        <DashboardLayout>
          <Container />
        </DashboardLayout>
      )
    };
    return (
      <AppLayout>
        <div style={{ background: '#4190f7', padding: 24, minHeight: '100%' }}>
          <div style={{ color: '#ffffff', textAlign: 'center', fontSize: '40px', marginTop: '15%' }}>
            WebSentry
          </div>
          <div style={{ color: '#ffffff', textAlign: 'center', fontSize: '20px', marginTop: '5%', marginLeft: '20%', marginRight: '20%' }}>
            Web Sentry is an open-source web service for monitoring selected sections of web pages. It automatically notifies the user if any changes happen.
          </div>
        </div>
      </AppLayout>
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

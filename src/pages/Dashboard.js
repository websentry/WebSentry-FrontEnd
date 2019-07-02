import React, { Component } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './dashboard/Container';
import DashboardLayout from '../layouts/DashboardLayout';
import {UserContext} from '../UserContext';
import './Dashboard.less';

class Dashboard extends Component {
  render() {
    return (
      <UserContext.Consumer>
        { ({isLoading, isLoggedIn, userEmail, toggleRefreash}) => {
          if (isLoading) {
            return (
              <div className="loading-spin-center">
                <Spin size="large" />
              </div>
            );
          };
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
        }}
      </UserContext.Consumer>
    );
  }
}

export default Dashboard;

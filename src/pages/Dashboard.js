import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NewTask from './dashboard/NewTask';
import AllTasks from './dashboard/AllTasks';
import Notifications from './dashboard/Notifications';
import Settings from './dashboard/Settings';
import DashboardLayout from '../layouts/DashboardLayout';
import {UserContext} from '../UserContext'

class Dashboard extends Component {
  render() {
    return (
      <UserContext.Consumer>
        { ({isLoading, isLoggedIn, userEmail, toggleRefreash}) => {
          if (isLoading) {
            return (
              <div>
                Loading
              </div>
            );
          };
          if (isLoggedIn) {
            return (
              <DashboardLayout>
              <Router>
                <Route path="/dashboard/new-task" component={NewTask} />
                <Route path="/dashboard/all-tasks" component={AllTasks} />
                <Route path="/dashboard/notifications" component={Notifications} />
                <Route path="/dashboard/settings" component={Settings} />
              </Router>
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

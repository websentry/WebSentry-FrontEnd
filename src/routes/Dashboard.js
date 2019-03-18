import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
}from 'react-router-dom';
import Task from './dashboard/Task'
import History from './dashboard/History'
import Notifications from './dashboard/Notifications'
import Settings from './dashboard/Settings'

class Dashboard extends Component {
  render() {
    return (
    <Router>
      <div>
        <ul>
          <li><Link to="/Dashboard/Task">Task</Link></li>
          <li><Link to="/Dashboard/History">History</Link></li>
          <li><Link to="/Dashboard/Notifications">Notifications</Link></li>
          <li><Link to="/Dashboard/Settings">Settings</Link></li>
        </ul>
        <hr/>
        <Route path="/Dashboard/Task" component={Task}/>
        <Route path="/Dashboard/History" component={History}/>
        <Route path="/Dashboard/Notifications" component={Notifications}/>
        <Route path="/Dashboard/Settings" component={Settings}/>
      </div>
    </Router>
    );
  }
}

export default Dashboard;

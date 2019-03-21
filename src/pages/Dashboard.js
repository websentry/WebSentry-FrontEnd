import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NewTask from "./dashboard/NewTask";
import AllTasks from "./dashboard/AllTasks";
import Notifications from "./dashboard/Notifications";
import Settings from "./dashboard/Settings";
import DashboardLayout from "../layouts/DashboardLayout";

class Dashboard extends Component {
  render() {
    return (
      <DashboardLayout>
        <Router>
          <Route path="/dashboard/new-task" component={NewTask} />
          <Route path="/dashboard/all-tasks" component={AllTasks} />
          <Route path="/dashboard/notifications" component={Notifications} />
          <Route path="/dashboard/settings" component={Settings} />
        </Router>
      </DashboardLayout>
    );
  }
}

export default Dashboard;

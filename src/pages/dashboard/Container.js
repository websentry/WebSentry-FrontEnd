import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewSentry from './sentry/NewSentry';
import Notifications from './Notifications.js'
import Home from './Home';

class Container extends Component {
  render() {
    return(
      <Router>
          <Switch>
            <Route exact path="/dashboard" component={Home} />
            <Route path="/dashboard/newSentry" component={NewSentry} />
            <Route path="/dashboard/notification" component={Notifications} />
          </Switch>
      </Router>
    );
  }
}

export default Container;

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NewSentry from './sentry/NewSentry';
import Notifications from './Notifications.js'
import Home from './Home';

class Container extends Component {
  render() {
    return(
        <Switch>
          <Route exact path="/dashboard" component={Home} />
          <Route path="/dashboard/newSentry" component={NewSentry} />
          <Route path="/dashboard/notifications" component={Notifications} />
        </Switch>
    );
  }
}

export default Container;

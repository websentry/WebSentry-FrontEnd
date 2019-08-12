import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewSentry from './sentry/NewSentry';
import Home from './Home';

class Container extends Component {
  render() {
    return(
      <Router>
          <Switch>
            <Route exact path="/dashboard" component={Home} />
            <Route path="/dashboard/newSentry" component={NewSentry} />
          </Switch>
      </Router>
    );
  }
}

export default Container;

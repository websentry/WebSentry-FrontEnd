import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Explore from './Explore';
import NoMatch from './NoMatch';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Explore} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;

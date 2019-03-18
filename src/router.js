import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
}from 'react-router-dom';
import IndexPage from './routes/IndexPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}>
      </Route>
    </Router>
  );
}

export default RouterConfig;
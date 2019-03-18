import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
}from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import Explore from './Explore';
import IndexPage from './IndexPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/Explore">Explore</Link></li>
            <li><Link to="/Dashboard">Dashboard</Link></li>
            <li><Link to="/IndexPage">IndexPage</Link></li>
          </ul>
          <hr/>
          <Route exact path="/Explore" component={Explore}/>
          {/* {subroutes defined in dashboard} */}
          <Route path="/Dashboard" component={Dashboard}/> 
          <Route path="/IndexPage" component={IndexPage}/> 
        </div>
      </Router>
    );
  }
}

export default App;

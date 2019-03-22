import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Explore from './Explore';
import NoMatch from './NoMatch';
import {UserContext} from '../UserContext'
import Api from '../helpers/Api';

class App extends Component {
  constructor(props) {
    super(props);

    // user context
    this.userContextToggleRefreash = async () => {
      if (!this.state.isLoading) {
        this.setState({isLoading: true});
      }

      const response = await Api.getUserInfo();
      if (response.code === Api.code.ok) {
        this.setState({
          isLoading: false,
          isLoggedIn: true,
          userEmail: response.data.email,
        });
      } else {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          userEmail: "",
        });
      }
      console.log(this.state);
    };

    this.state = {
      isLoading: true,
      isLoggedIn: false,
      userEmail: "",
      toggleRefreash: () => this.userContextToggleRefreash,
    };

    // async function, don't wait
    this.userContextToggleRefreash();
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <Router>
          <Switch>
            <Route exact path="/" component={Explore} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;

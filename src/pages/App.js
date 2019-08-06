import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Explore from './Explore';
import NoMatch from './NoMatch';
import Login from './Login';
import RegisterForm from './RegisterForm';
import {UserContext} from '../UserContext'
import Api from '../helpers/Api';

import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zh_CN from '../locale/lang/zh_CN.js';
import en_US from '../locale/lang/en_US.js';

addLocaleData([...en, ...zh]);

class App extends Component {
  constructor(props) {
    super(props);

    // user context
    this.userContextToggleRefresh = async () => {

      if (!this.state.isLoading) {
        this.setState({isLoading: true});
      }

      const response = await Api.getUserInfo();
      console.log(response);
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
    };

    this.switchLang = () => {
      switch (this.state.lang.split('-')[0]) {
        case 'en':
          this.setState({ lang:'zh-CN' });
          break;
        case 'zh':
          this.setState({ lang:'en-US' });
          break;
        default:
          this.setState({ lang:navigator.language });
          break;
      }
      console.log(this.state);
    }

    this.onLoading = () => {
      this.setState({ isLoading: true });
    }

    this.cancelLoading = () => {
      this.setState({ isLoading: false });
    }

    this.state = {
      lang:navigator.language,
      isLoading: true,
      isLoggedIn: false,
      userEmail: "",
      toggleRefresh: this.userContextToggleRefresh,
      switchLang: this.switchLang,
      onLoading: this.onLoading,
      cancelLoading: this.cancelLoading
    };

    // async function, don't wait
    this.userContextToggleRefresh();
  }

  chooseLocale() {
    switch(this.state.lang.split('-')[0]){
        case 'en':
            return en_US;
        case 'zh':
            return zh_CN;
        default:
            return en_US;
    }
  }

  render() {
    console.log("loading app");
    return (
      <UserContext.Provider value={this.state}>
        <IntlProvider locale={this.state.lang}  messages={this.chooseLocale()}>
          <Router>
              <Switch>
                <Route exact path="/" component={Explore} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={RegisterForm} />
                <Route component={NoMatch} />
              </Switch>
          </Router>
        </IntlProvider>
      </UserContext.Provider>
    );
  }
}

export default App;

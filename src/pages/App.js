import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
import NoMatch from './NoMatch';
import Login from './Login';
import Register from './Register';
import {UserContext} from '../UserContext';
import api from '../helpers/Api';
import { IntlProvider } from 'react-intl';
import zh_CN from '../locale/lang/zh_CN.js';
import en_US from '../locale/lang/en_US.js';

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/en');
  require('@formatjs/intl-pluralrules/locale-data/zh');
}

class App extends Component {
  constructor(props) {
    super(props);

    // user context
    this.userContextToggleRefresh = async () => {

      if (!this.state.isLoading) {
        this.setState({isLoading: true});
      }

      const response = await api.getUserInfo();
      console.log(response);
      if (response.code === api.code.ok) {
        this.setState({
          isLoading: false,
          isLoggedIn: true,
          userEmail: response.data.email,
          lang: response.data.language,
          tz: response.data.timeZone
        });
      } else {
        this.setState({
          isLoading: false,
          isLoggedIn: false,
          userEmail: "",
          lang: navigator.language,
          tz: "",
        });
        window.localStorage.clear();
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
      lang: navigator.language,
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
                <Route exact path="/" component={Home} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route component={NoMatch} />
              </Switch>
          </Router>
        </IntlProvider>
      </UserContext.Provider>
    );
  }
}

export default App;

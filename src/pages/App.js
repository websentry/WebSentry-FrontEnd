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
import preferredLocale from 'preferred-locale';

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/en');
  require('@formatjs/intl-pluralrules/locale-data/zh');
}

let moment = require('moment-timezone');

const guessUserLanguage = () => {
  const translatedLocales = [ 'zh-CN', 'zh-Hans', 'en-US' ];
  let preferredLang = preferredLocale(
      translatedLocales,
      'en-US',
      { lowerCaseRegion: false }
  );

  switch (preferredLang) {
    case 'zh-CN':
      return 'zh-Hans';
    case 'zh-Hans':
      return 'zh-Hans';
    default:
      return 'en-US';
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    let preferredLang = window.localStorage.getItem("lang");
    if (!preferredLang) {
      preferredLang = guessUserLanguage();
      window.localStorage.setItem("lang", preferredLang);
    }

    // user context
    this.userContextToggleRefresh = async () => {

      if (!this.state.isLoading) {
        this.setState({isLoading: true});
      }

      const response = await api.getUserInfo();
      console.log(response);
      if (response.code === api.code.ok) {
        window.localStorage.setItem("lang", response.data.language);

        this.setState({
          isLoading: false,
          isLoggedIn: true,
          userEmail: response.data.email,
          lang: response.data.language,
          tz: response.data.timeZone
        });
      } else {
        window.localStorage.setItem("disableTimeZoneDiffNotice", '');

        this.setState({
          isLoading: false,
          isLoggedIn: false,
          userEmail: "",
          tz: moment.tz.guess(),
        });

      }
    };

    this.switchLang = lang => {
      this.setState({ lang });
      window.localStorage.setItem("lang", lang);
    }

    this.onLoading = () => {
      this.setState({ isLoading: true });
    }

    this.cancelLoading = () => {
      this.setState({ isLoading: false });
    }

    this.state = {
      lang: preferredLang,
      tz: moment.tz.guess(),
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
    if(this.state.lang === 'zh-Hans') {
      return zh_CN;
    } else {
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

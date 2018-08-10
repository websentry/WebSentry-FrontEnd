import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import Home from './components/Home.js';
import Console from './components/Console.js';

// TODO: Terrible quality, refactor needed

render((
  <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/console' component={Console}/>
      </Switch>
  </BrowserRouter>
), document.getElementById('root'));

import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
}from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

class App extends Component {

  constructor(props){
    super(props);
    this.state = props.state;
    this.switchLang= props.switchLang;
  }

  render() {
    return (
        <AppLayout
           state = {this.state}
           switchLang={this.switchLang}
        >
            <div>
                hahahahahaha
            </div>
        </AppLayout>
    );
  }
}

export default App;

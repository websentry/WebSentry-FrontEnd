import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
}from 'react-router-dom';
import HomeLayout from '@/layouts/HomeLayout';

class App extends Component {
  render() {
    return (
        <HomeLayout>
            <div>
                hahahahahaha
            </div>
        </HomeLayout>
    );
  }
}

export default App;

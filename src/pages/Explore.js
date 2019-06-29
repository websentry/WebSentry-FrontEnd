import React, { Component } from 'react';
import AppLayout from '../layouts/AppLayout';
import {
  Layout,
  Breadcrumb
} from 'antd';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <AppLayout>
        <div class="container mt-5">
          <div class="jumbotron">
            <h1 class="display-4">Hello, world!</h1>
            <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          </div>
          <div class="input-group mb-3">
            <input type="text" class="form-control form-control-lg" placeholder="Enter website: www.google.com" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <div class="input-group-append">
              <button type="button" class="btn btn-primary btn-lg">Large button</button>
            </div>
          </div>
          <div class="input-group mb-3">
            <input type="text" class="form-control form-control-lg" placeholder="me@example.com" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <div class="input-group-append">
              <button type="button" class="btn btn-primary btn-lg">Large button</button>
            </div>
          </div>
        </div>

      </AppLayout>
    );
  }
}

export default App;

import React from 'react';
import AppLayout from '../layouts/AppLayout';
import './Explore.less';

class Explore extends React.Component {
  
  render() {
    return (
      <AppLayout>
        <div className="container mt-5">
          <div className="jumbotron">
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          </div>
        </div>
      </AppLayout>
    );
  }
}

export default Explore;

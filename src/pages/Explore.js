import React from 'react';
import AppLayout from '../layouts/AppLayout';
import './Explore.less';

class Explore extends React.Component {

  render() {
    return (
      <AppLayout>
        <div style={{ background: '#4190f7', padding: 24, minHeight: '100%', boxShadow: 'inset 0 0 5rem' }}>
          <div style={{ color: '#ffffff', textAlign: 'center', fontSize: '64px', marginTop: '12%' }}>
            WebSentry
          </div>
          <div style={{ color: '#ffffff', textAlign: 'center', fontSize: '32px', marginTop: '5%', marginLeft: '15%', marginRight: '15%' }}>
            Web Sentry is an open-source web service for monitoring selected sections of web pages. It automatically notifies the user if any changes happen.
          </div>
        </div>
      </AppLayout>
    );
  }
}

export default Explore;

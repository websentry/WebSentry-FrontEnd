import React from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader'
import AppFooter from './AppFooter';
import './AppLayout.less'

const { Content } = Layout

class AppLayout extends React.Component {
  render() {
    return (
      <Layout className="home-layout">
        <AppHeader selected={this.props.page}/>
        <Content>
          {this.props.children}
        </Content>
        <AppFooter />
      </Layout>
    );
  }
}

export default AppLayout;

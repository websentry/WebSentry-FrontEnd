import React from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

const { Content } = Layout

class HomeLayout extends React.Component {
  render() {
    return (
      <Layout>
        <AppHeader />
        <Content>
          {this.props.children}
        </Content>
        <AppFooter />
      </Layout>
    );
  }
}

export default HomeLayout;
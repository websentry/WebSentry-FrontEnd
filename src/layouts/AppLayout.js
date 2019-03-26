import React from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader'
import AppFooter from './AppFooter';
import './AppLayout.less'

const { Content } = Layout

class AppLayout extends React.Component {
  constructor(props){
    super(props);
    this.state = props.state;
    this.switchLang= props.switchLang;
  }
  render() {
    return (
      <Layout className="home-layout">
        <AppHeader state = {this.state} switchLang={this.switchLang}/>
        <Content>
          {this.props.children}
        </Content>
        <AppFooter />
      </Layout>
    );
  }
}

export default AppLayout;

import React from 'react';
import { Layout, Menu } from 'antd';
import logo from '../assets/logo.png'
import './AppHeader.less'

const { Header } = Layout;

class AppHeader extends React.Component {
  render() {
    return (
      <Header className="app-header">
          <img src={logo} className="app-header-logo"/>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["explore"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="explore">Explore</Menu.Item>
          <Menu.Item key="dashboard">Dashboard</Menu.Item>
          <Menu.Item key="signIn">Sign in</Menu.Item>
          <Menu.Item key="signUp">Sign up</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default AppHeader;

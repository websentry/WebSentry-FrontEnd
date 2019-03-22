import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

class AppHeader extends React.Component {
  render() {
    return (
      <Header className="app-header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
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

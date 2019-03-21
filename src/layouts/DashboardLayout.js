import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AppFooter from './AppFooter';

const { Header, Content, Sider } = Layout;

class DashboardLayout extends React.Component {
  render() {
    return (
        <Router>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="dashboardNewTask">
              <Icon type="plus-square" />
              <span>New Task</span>
            </Menu.Item>
            <Menu.Item key="dashboardAllTasks">
              <Icon type="database" />
              <span>All Tasks</span>
            </Menu.Item>
            <Menu.Item key="dashboardNotifications">
              <Icon type="bell" />
              <span>Notifications</span>
            </Menu.Item>
            <Menu.Item key="dashboardSetting">
              <Icon type="setting" />
              <span>Setting</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
        </Router>
    );
  }
}

export default DashboardLayout;

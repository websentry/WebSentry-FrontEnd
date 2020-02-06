import React from 'react';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import AppFooter from './AppFooter';
import logo from '../assets/logo.png'
import './DashboardLayout.less'
import { UserContext } from '../UserContext';

const { Content, Sider } = Layout;

const onClick = ({ key }) => {
  localStorage.removeItem('ws-token');
  sessionStorage.removeItem('ws-token');
  window.location.href="/login"
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">logout</Menu.Item>
  </Menu>
);

class DashboardLayout extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {({userEmail}) => (
          <Router>
            <Layout className="dashboard-layout">
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

                <img className="dashboard-logo" src={logo} alt=""/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboardHome"]}>
                  <Menu.Item key="dashboardHome">
                    <Icon type="database" />
                    <span>Home</span>
                  </Menu.Item>
                  <Menu.Item key="dashboardNotifications">
                    <Icon type="bell" />
                    <span>Notifications</span>
                  </Menu.Item>
                  <Menu.Item key="dashboardSetting">
                    <Icon type="setting" />
                    <span>Setting</span>
                  </Menu.Item>
                  <Dropdown overlay={menu}>
                    <div style={{position:"absolute", left:24, bottom:10}}>
                      <Icon type="user"/>&nbsp;&nbsp;{userEmail}
                    </div>
                  </Dropdown>
                </Menu>
              </Sider>
              <Layout>
                <Content style={{ margin: "24px 16px 0" }}>
                  <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                    {this.props.children}
                  </div>
                </Content>
                <AppFooter />
              </Layout>
            </Layout>
          </Router>
        )}
      </UserContext.Consumer>
      
    );
  }
}

export default DashboardLayout;

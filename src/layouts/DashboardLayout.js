import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import AppFooter from './AppFooter';
import logo from '../assets/logo.png'
import './DashboardLayout.less'

const { Content, Sider } = Layout;

class DashboardLayout extends React.Component {
  render() {
    return (
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

          <img className="dashboard-logo" src={logo} alt="" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["home"]}
            selectedKeys={[this.props.page]}
          >
            <Menu.Item key="home">
              <Link to="/dashboard/">
                <Icon type="database" />
                <span>Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="notifications">
              <Link to="/dashboard/notifications">
                <Icon type="bell" />
                <span>Notifications</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="settings">
              <Link to="/dashboard/settings">
                <Icon type="setting" />
                <span>Setting</span>
              </Link>
            </Menu.Item>
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
    );
  }
}

export default DashboardLayout;

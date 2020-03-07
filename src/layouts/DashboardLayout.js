import React, { Component} from 'react';
import { BellOutlined, DatabaseOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown } from 'antd';
import { injectIntl } from 'react-intl';
import AppFooter from './AppFooter';
import logo from '../assets/logo.png'
import './DashboardLayout.less'
import { UserContext } from '../UserContext';
import api from '../helpers/Api';
import { Link } from "react-router-dom";

const { Content, Sider } = Layout;

class DashboardLayout extends Component {  
  onClick = () => {
    api.logout();
    this.props.userContext.toggleRefresh();
  };
  render() {
    const { intl } = this.props;
    return (
      <UserContext.Consumer>
        {({userEmail}) => (
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
                    <DatabaseOutlined />
                    <span>{intl.formatMessage({ id: "dashboardSidebarHome" })}</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="notifications">
                  <Link to="/dashboard/notifications">
                    <BellOutlined />
                    <span>{intl.formatMessage({ id: "dashboardSidebarNotifications" })}</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="settings">
                  <Link to="/dashboard/settings">
                    <SettingOutlined />
                    <span>{intl.formatMessage({ id: "dashboardSidebarSetting" })}</span>
                  </Link>
                </Menu.Item>
                <Dropdown overlay={ <Menu>
                                      <Menu.Item key="1" style={{ "color": "black", "cursor": "default" }} disabled>{userEmail}</Menu.Item>
                                      <Menu.Divider />
                                      <Menu.Item key="2" onClick={this.onClick}>Logout</Menu.Item>
                                    </Menu>}>
                  <div style={{ position:"absolute", left:24, bottom:10 }}>
                    <UserOutlined />&nbsp;&nbsp;{userEmail.length > 15 ? userEmail.substring(0, 15) + "..." : userEmail}
                  </div>
                </Dropdown>
              </Menu>
            </Sider>
            <Layout>
              <Content style={{ margin: "24px 16px 0" }}>
                <div style={{ padding: 24, background: "#fff", minHeight: "90vh" }}>
                  {this.props.children}
                </div>
              </Content>
              <AppFooter />
            </Layout>
          </Layout>
        )}
      </UserContext.Consumer>
    );
  }
}

const WithContext = (Component) => {
  return (props) => (
      <UserContext.Consumer>
        {userContext =>  <Component {...props} userContext={userContext} />}
      </UserContext.Consumer>
  )
}

export default injectIntl(WithContext(DashboardLayout));

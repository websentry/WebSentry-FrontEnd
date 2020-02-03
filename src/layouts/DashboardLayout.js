import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl'; 
import AppFooter from './AppFooter';
import logo from '../assets/logo.png'
import './DashboardLayout.less'

const { Content, Sider } = Layout;

class DashboardLayout extends React.Component {
  render() {
    const { intl } = this.props;
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
                <span>{intl.formatMessage({ id: "dashboardSidebarHome" })}</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="notifications">
              <Link to="/dashboard/notifications">
                <Icon type="bell" />
                <span>{intl.formatMessage({ id: "dashboardSidebarNotifications" })}</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="settings">
              <Link to="/dashboard/settings">
                <Icon type="setting" />
                <span>{intl.formatMessage({ id: "dashboardSidebarSetting" })}</span>
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

export default injectIntl(DashboardLayout);

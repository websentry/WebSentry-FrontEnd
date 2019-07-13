import React from 'react';
import {Avatar, Layout, Menu} from 'antd';
import { FormattedMessage } from 'react-intl';
import './DashboardHeader.less'

const { Header } = Layout;

class AppHeader extends React.Component {
    // TODO: to import pictures locally 
    render() {
      return (
        <Header className="dashboard-header">
          <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["dashboard"]}
              style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="dashboard">
              <FormattedMessage
                id='dashboard'
                defaultMessage='Dashboard'
              />
            </Menu.Item>
            <Menu.Item key="explore">
              <FormattedMessage
                id='explore'
                defaultMessage='Explore'
              />
            </Menu.Item>
            <Menu.Item disabled="true" className="dashboard-header-item-avatar" key="avatar">
                <Avatar shape="circle" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
            </Menu.Item>
          </Menu>
        </Header>
      );
    }
}

export default AppHeader;

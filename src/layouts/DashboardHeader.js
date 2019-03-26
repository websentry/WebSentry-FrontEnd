import React from 'react';
import {Avatar, Layout, Menu} from 'antd';
import './DashboardHeader.less'

const { Header } = Layout;

class AppHeader extends React.Component {
    render() {
        return (
            <Header className="dashboard-header">
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={["dashboard"]}
                    style={{ lineHeight: "64px" }}
                >
                    <Menu.Item key="dashboard">Dashboard</Menu.Item>
                    <Menu.Item key="explore">Explore</Menu.Item>

                    <Menu.Item disabled="true" className="dashboard-header-item-avatar" key="avatar">
                        <Avatar shape="circle" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                    </Menu.Item>

                </Menu>

            </Header>
        );
    }
}

export default AppHeader;

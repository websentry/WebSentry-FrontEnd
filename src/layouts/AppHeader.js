import React from 'react';
import { GlobalOutlined, LoadingOutlined } from '@ant-design/icons';
import { Layout, Menu, Spin } from 'antd';
import { FormattedMessage } from 'react-intl';
import { UserContext } from '../UserContext';
import { Link, withRouter } from "react-router-dom";
import logo from '../assets/logo.png';
import './AppHeader.less';

const { Header } = Layout;
const { SubMenu } = Menu;

class AppHeader extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ switchLang, isLoggedIn, isLoading }) => {
          let userMenu;
          if (isLoading) {
            const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
            userMenu = (
              <Menu.Item key="dashboard" style={{ float: "right" }}>
                <Spin indicator={spinIcon} />
              </Menu.Item>
            )
          } else {
            if (isLoggedIn) {
              userMenu = (
                <Menu.Item key="dashboard" style={{ float: "right" }}>
                  <Link to="/dashboard">
                    <FormattedMessage
                      id='dashboard'
                      defaultMessage='Dashboard'
                    />
                  </Link>
                </Menu.Item>
              )
            } else {
              userMenu = [
                <Menu.Item
                  key="register"
                  style={{ width: "80px", textAlign: "center", float: "right" }}
                >
                  <Link to='/register'>
                    <FormattedMessage
                      id='signUp'
                      defaultMessage='Sign up'
                    />
                  </Link>
                </Menu.Item>
                ,
                <Menu.Item
                  key="login"
                  style={{ width: "80px", textAlign: "center", float: "right" }}
                >
                  <Link to="/login">
                    <FormattedMessage
                      id='signIn'
                      defaultMessage='Sign in'
                    />
                  </Link>
                </Menu.Item>
              ]
            }
          }

          return (
            <Header className="app-header">
              <img src={logo} className="app-header-logo" alt="" />
              <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: "64px" }}
                defaultSelectedKeys={["home"]}
                selectedKeys={[this.props.selected]}
              >
                <Menu.Item
                  key="home"
                  style={{ width: "80px", textAlign: "center" }}
                >
                  <Link to="/">
                    <FormattedMessage
                      id='home'
                      defaultMessage='Home'
                    />
                  </Link>
                </Menu.Item>
                <SubMenu
                  key="language"
                  title={
                    <span>
                      <GlobalOutlined style={{ fontSize: "16px" }} />
                    </span>
                  }
                  style={{ float: "right" }}
                >
                  <Menu.Item
                    key="switchLang"
                    onClick={
                      isLoggedIn ? (
                        () => {
                          this.props.history.push("/dashboard/settings")
                        }
                      ) : switchLang
                    }
                  >
                    <FormattedMessage
                      id='lang'
                      defaultMessage='Language:English'
                    />
                  </Menu.Item>
                </SubMenu>
                {userMenu}
              </Menu>
            </Header>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default withRouter(AppHeader);

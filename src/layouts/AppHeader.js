import React from 'react';
import { Icon, Layout, Menu } from 'antd';
import { FormattedMessage } from 'react-intl';
import { UserContext } from '../UserContext';
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import './AppHeader.less';

const { Header } = Layout;
const { SubMenu } = Menu;

class AppHeader extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {/* TODO check loading state */}
        { ({switchLang, isLoggedIn}) => {
            return (
              <Header className="app-header">
                <img src={logo} className="app-header-logo" alt=""/>
                { isLoggedIn ?
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: "64px" }}
                    defaultSelectedKeys={["home"]}
                    selectedKeys={[this.props.selected]}
                  >
                    <Menu.Item
                      key="home"
                      style={{ width: "80px", textAlign: "center"}}
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
                          <Icon type="global" style={{ fontSize: "16px" }} />
                        </span>
                      }
                      style={{ float: "right" }}
                    >
                      <Menu.Item key="switchLang" onClick={switchLang}>
                        <FormattedMessage
                          id='lang'
                          defaultMessage='Language:English'
                        />
                      </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="dashboard" style={{ float: "right" }}>
                      <Link to="/dashboard">
                        <FormattedMessage
                          id='dashboard'
                          defaultMessage='Dashboard'
                        />
                      </Link>
                    </Menu.Item>
                  </Menu>
                  :
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: "64px" }}
                    defaultSelectedKeys={["home"]}
                    selectedKeys={[this.props.selected]}
                  >
                    <Menu.Item
                      key="home"
                      style={{ width: "80px", textAlign: "center"}}
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
                          <Icon type="global" style={{ fontSize: "16px" }} />
                        </span>
                      }
                      style={{ float: "right" }}
                    >
                      <Menu.Item key="switchLang" onClick={switchLang}>
                        <FormattedMessage
                          id='lang'
                          defaultMessage='Language:English'
                        />
                      </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="register" style={{ float: "right" }}>
                      <Link to='/register'>
                        <FormattedMessage
                          id='signUp'
                          defaultMessage='Sign up'
                        />
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="login" style={{ float: "right" }}>
                      <Link to="/login">
                        <FormattedMessage
                          id='signIn'
                          defaultMessage='Sign in'
                        />
                      </Link>
                    </Menu.Item>
                  </Menu>
                }
              </Header>
            );
        }}
      </UserContext.Consumer>
    );
  }
}

export default AppHeader;

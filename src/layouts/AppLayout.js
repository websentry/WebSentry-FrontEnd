import React from 'react';
import { Layout, Spin } from 'antd';
import { Redirect, withRouter } from "react-router-dom";
import AppHeader from './AppHeader'
import AppFooter from './AppFooter';
import { UserContext } from '../UserContext';
import './AppLayout.less'

const { Content } = Layout

class AppLayout extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ isLoggedIn, isLoading }) => {
          let content = this.props.children;
          // login and register page only works when the user is not logged in
          if (["login", "register"].includes(this.props.page)) {
            if (isLoading) {
              // replace content with loading spin
              content = (
                <div className="loading-spin-center">
                  <Spin size="large" spinning={true} />
                </div>
              );
            } else {
              if (isLoggedIn) {
                if (this.props.location.state) {
                  if (this.props.location.state.referrer) {
                    return (<Redirect to={this.props.location.state.referrer}/>);
                  }
                }
                return (<Redirect to={'/dashboard'} />);
              }
            }
          };

          return (
            <Layout className="home-layout">
              <AppHeader selected={this.props.page} />
              <Content>
                {content}
              </Content>
              <AppFooter />
            </Layout>
          )
        }}
      </UserContext.Consumer>

    );
  }
}

export default withRouter(AppLayout);

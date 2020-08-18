import React from 'react';
import { Layout, Spin } from 'antd';
import { Redirect, withRouter } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { UserContext } from '../UserContext';
import './AppLayout.less';

const { Content } = Layout;

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    this.prop = props;
    console.log(this.prop);
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ isLoggedIn, isLoading }) => {
          let content = this.prop.children;
          // login and register page only works when the user is not logged in
          if (['login', 'register'].includes(this.prop.page)) {
            if (isLoading) {
              // replace content with loading spin
              content = (
                <div className="loading-spin-center">
                  <Spin size="large" spinning={true} />
                </div>
              );
            } else {
              if (isLoggedIn) {
                if (this.prop.location.state) {
                  if (this.prop.location.state.referrer) {
                    return <Redirect to={this.prop.location.state.referrer} />;
                  }
                }
                return <Redirect to={'/dashboard'} />;
              }
            }
          }

          return (
            <Layout className="home-layout">
              <AppHeader selected={this.prop.page} />
              <Content>{content}</Content>
              <AppFooter />
            </Layout>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default withRouter(AppLayout);

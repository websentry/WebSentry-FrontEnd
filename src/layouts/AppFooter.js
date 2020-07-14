import React from 'react';
import { CopyrightOutlined, GithubOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import './AppFooter.less';

const { Footer } = Layout;

class AppFooter extends React.Component {
  render() {
    return (
      <Footer className="app-footer">
        Copyright <CopyrightOutlined /> WebSentry<br/>
        <a href="https://github.com/websentry/WebSentry">View on Github <GithubOutlined /></a>
      </Footer>
    );
  }
}

export default AppFooter;

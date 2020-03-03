import React from 'react';
import { CopyrightOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import './AppFooter.less';

const { Footer } = Layout;

class AppFooter extends React.Component {
  render() {
    return (
      <Footer className="app-footer">
        Copyright <CopyrightOutlined /> WebSentry
      </Footer>
    );
  }
}

export default AppFooter;

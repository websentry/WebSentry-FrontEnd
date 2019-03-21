import React from "react";
import { Layout, Icon } from "antd";
import './AppFooter.less'

const { Footer } = Layout;

class AppFooter extends React.Component {
  render() {
    return (
      <Footer className="app-footer">
        Copyright <Icon type="copyright" /> WebSentry
      </Footer>
    );
  }
}

export default AppFooter;

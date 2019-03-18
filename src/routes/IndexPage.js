import React, {Component} from 'react';
import styles from './IndexPage.css';
import { Layout, Menu, Icon } from 'antd';
import SiderComponent from '../components/Siderbar';
import {
  BrowserRouter as Router,
  Route,
  Link
}from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

function IndexPage({children}) {
  return (
    <Layout style={{width:'100%',height: '100%'}}>
      {/* //侧边栏 */}
      <Sider>
        <SiderComponent />
      </Sider>
      <Layout>
        {/* //顶部菜单 */}
        <Header style={{ background: '#fff', padding: 0 , borderBottom:'1px solid #ccc'}}>
          <Menu mode="horizontal" style={{float:'right'}}>
            <SubMenu  title={<span><Icon type="user"/>Estelle</span>}>
              <Menu.Item key="setting:1">退出</Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
        {/* //内容区，嵌入子组件 */}
        <Content className={styles.rightBox}>
            {children || 'content'}
        </Content>
        <Footer className={styles.footer}>
            Framework of web Sentry
        </Footer>
      </Layout>
    </Layout>
  );
}
export default IndexPage;
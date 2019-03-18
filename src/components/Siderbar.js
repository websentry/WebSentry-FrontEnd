import React, {Component} from 'react';
import { Menu, Icon } from 'antd';
import styles from '../routes/IndexPage.css';
import logoSrc from '../assets/logo.png';
const SubMenu = Menu.SubMenu;

const SiderComponent = () => {
  return(
  <div className={styles.leftMenu}>
    <img src={logoSrc} width="50" className={styles.logo} />
    <Menu theme="dark" 
      defaultOpenKeys={['sub']}
       defaultSelectedKeys={['5']}  
      mode="inline"
    >
      <SubMenu
        key="sub"
        // title={<span><Icon type="mail" /><span>Dashboard</span></span>}
      >
        {/* <Menu.Item key="1"><Link to="/Dashboard/Tasks">Tasks</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/Dashboard/History">History</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/Dashboard/Notifications">Notifications</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/Dashboard/Settings">Settings</Link></Menu.Item> */}
      </SubMenu>
    </Menu>
  </div>
  )
}
export default SiderComponent;
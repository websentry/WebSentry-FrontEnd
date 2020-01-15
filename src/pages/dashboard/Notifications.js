import React, { Component } from 'react';
import { Divider, List, PageHeader } from 'antd';
import NotificationItem from './NotificationItem';
import api from '../../helpers/Api.js';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      notificationList: []
    };
    this.loadData();
  }

  async loadData() {
    if (!this.state.isLoading) {
      this.setState({isLoading: true});
    }

    const response = await api.getAllNotifications();

    if (response.code === api.code.ok) {
      this.setState({
        isLoading: false,
        notificationList: response.data.notifications
      });
    } else {
      console.log("---- Error ----");
      console.log(response);
    }
  }

  NotificationCard(item) {
    return (
      <NotificationItem item={item} />
    )
  }

  render() {
    return (
      <div>
        <PageHeader 
          title={<h2>Notification Methods</h2>}
        />
        <Divider />
        <List 
          itemLayout="horizontal"
          loading={this.state.isLoading}
          dataSource={this.state.notificationList}
          renderItem={this.NotificationCard}
        />
      </div>
    );
  }
}

export default Notifications;

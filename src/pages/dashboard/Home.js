import React, { Component } from 'react';
import { PageHeader, Divider, Button, List } from 'antd';
import SentryItem from './sentry/SentryItem';
import api from '../../helpers/Api';
import './Home.less'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      notificationList:[]
    };
    this.loadData();
    this.showCreateSentry = () => {
      props.history.push('/dashboard/newSentry');
    };
  };

  async loadData() {
    if (!this.state.isLoading) {
      this.setState({isLoading: true});
    }

    const response = await api.getAllSentries();
    const response2 = await api.getAllNotifications();

    console.log(response);
    console.log(response2);
    if (response.code === api.code.ok && response2.code === api.code.ok) {
      this.setState({
        isLoading: false,
        data: response.data.sentries,
        notificationList: response2.data.notifications
      });
    } else {
      console.log("---- Error ----");
      console.log(response);
      console.log(response2);
    }

  }

  SentryCard(item) {
    return (
      <SentryItem item={item}/>
    );
  }

  render() {
    return (
      <div>
        <PageHeader
          title="Active Sentrys"
          extra={
            <Button
              type="primary"
              icon="plus-circle"
              size="default"
              onClick={this.showCreateSentry}>
              Create Sentry
            </Button>
          }
        />
        <Divider />
        <List
          loading={this.state.isLoading}
          grid={{
            gutter: 4, xs: 1, sm: 1, md: 2, xl: 3, xxl: 4,
          }}
          dataSource={this.state.data}
          renderItem={this.SentryCard}
        />
      </div>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { PageHeader, Divider, Button, List } from 'antd';
import DashboardLayout from '../../layouts/DashboardLayout';
import SentryItem from './sentry/SentryItem';
import api from '../../helpers/Api';
import './Home.less'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };
    this.loadData();
    this.showCreateSentry = () => {
      props.history.push('/dashboard/newSentry');
    };
  };

  async loadData() {
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true
      });
    }

    const response = await api.getAllSentries();

    if (response.code === api.code.ok) {
      this.setState({
        isLoading: false,
        data: response.data.sentries
      });
    } else {
      console.log('---- Error ----');
      console.log(response);
    }
  }

  SentryCard(item) {
    return (
      <SentryItem item={item}/>
    );
  }

  render() {
    return (
      <DashboardLayout page='home'>
        <div>
          <PageHeader
            title='Active Sentries'
            extra={
              <Button
                type='primary'
                icon={<PlusCircleOutlined />}
                size='default'
                onClick={this.showCreateSentry}
              >
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
      </DashboardLayout>
    );
  }
}

export default Home;

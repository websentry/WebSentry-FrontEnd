import React, { Component } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Collapse, Descriptions, Divider, List, PageHeader } from 'antd';
import api from '../../../helpers/Api.js';
import moment from 'moment';

const { Panel } = Collapse;

class SentryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: this.props.location.pathname.split("/").pop(),
      data: [],
      notification: [],
      image: [],
      imageHistory: []
    }
    this.loadData();
  }

  async loadData() {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    // load data
    const response = await api.getSentryInfo(this.state.id);

    if (response.code === api.code.ok) {
      this.setState({
        loading: false,
        data: response.data,
        notification: response.data.notification,
        image: response.data.image,
        imageHistory: response.data.imageHistory.images.reverse()
      });
    } else {
      console.log("ERROR");
    }
  }

  getHistoryImageURL(filename) {
    return api.getHistoryImage(filename);
  }

  render() {
    return (
      <DashboardLayout page="home">
        <PageHeader
          title={"Sentry Detail"}
        />
        <Divider />
        <List
          loading={this.state.loading}
        >
          <Descriptions column={2} style={{paddingBottom: "24px"}} bordered>
            <Descriptions.Item label="Name">{this.state.data.name}</Descriptions.Item>
            <Descriptions.Item label="Create Time">{moment(this.state.data.createTime).format('MMMM Do YYYY, h:mm A')}</Descriptions.Item>
            <Descriptions.Item label="Last Check Time">{moment(this.state.data.lastCheckTime).fromNow()}</Descriptions.Item>
            <Descriptions.Item label="Interval">{this.state.data.interval}</Descriptions.Item>
            <Descriptions.Item label="Checked Count">{this.state.data.checkCount}</Descriptions.Item>
            <Descriptions.Item label="Notified Count">{this.state.data.notifyCount}</Descriptions.Item>
          </Descriptions>
        </List>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Notification Info" key="1">
            <Descriptions column={2} bordered>
              <Descriptions.Item label="Notification Name">{this.state.notification.name}</Descriptions.Item>
              <Descriptions.Item label="Notification Type">{this.state.notification.type}</Descriptions.Item>
              }
            </Descriptions>
          </Panel>
          <Panel header="Screenshot History" key="2">
            <List 
              itemLayout="horizontal"
              dataSource={this.state.imageHistory}
              renderItem={item => (
                <List.Item
                  extra={
                    <img
                      width={272}
                      alt="screenshot"
                      src={this.getHistoryImageURL(item.file)}
                    />
                  }
                >
                  <List.Item.Meta
                    title={moment(item.time).format('MMMM Do YYYY, h:mm A')}
                    description={moment(item.time).fromNow()}
                  />
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      </DashboardLayout>
    );
  }
}

export default SentryDetail;
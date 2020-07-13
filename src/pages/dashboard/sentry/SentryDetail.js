import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { Collapse, Descriptions, Divider, List, PageHeader, Tag } from 'antd';
import api from '../../../helpers/Api.js';
import moment from 'moment';
import { withRouter } from "react-router";

const { Panel } = Collapse;

class SentryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: this.props.match.params.sentryID,
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
        imageHistory: response.data.imageHistory
      });
    } else {
      // TODO error handling
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
          onBack={() => {this.props.history.push('/dashboard');}}
        />
        <Divider />
        <List loading={this.state.loading}>
          <Descriptions column={2} style={{paddingBottom: "24px"}} bordered>
            <Descriptions.Item label="Name">{this.state.data.name}</Descriptions.Item>
            <Descriptions.Item label="Create Time">{moment(this.state.data.createTime).format('MMMM Do YYYY, h:mm A')}</Descriptions.Item>
            <Descriptions.Item label="Last Check Time">{moment(this.state.data.lastCheckTime).fromNow()}</Descriptions.Item>
            <Descriptions.Item label="Interval">{this.state.data.interval}</Descriptions.Item>
            <Descriptions.Item label="Checked Count">{this.state.data.checkCount}</Descriptions.Item>
            <Descriptions.Item label="Notified Count">{this.state.data.notifyCount}</Descriptions.Item>
            <Descriptions.Item label="Notification Method">
              { this.state.notification.type === "email" ?
                <div>
                  <Tag color="#87d068">Email</Tag>
                  <FormattedMessage
                    id='defaultEmail'
                    defaultMessage='Default Email'
                  />
                </div>
                :
                <div>
                  <Tag color="#4b90de">ServerChan</Tag>
                  { this.state.notification.name }
                </div>
              }
            </Descriptions.Item>
          </Descriptions>
        </List>
        <Collapse defaultActiveKey={['1']} style={{ marginBottom: "16px"}}>
          <Panel header="Screenshot History" key="1">
            <List 
              loading={this.state.loading}
              itemLayout="vertical"
              dataSource={this.state.imageHistory}
              pagination={{ pageSize: 3 }}
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
                    title={moment(item.createdAt).format('MMMM Do YYYY, h:mm A')}
                    description={moment(item.createdAt).fromNow()}
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

export default withRouter(SentryDetail);

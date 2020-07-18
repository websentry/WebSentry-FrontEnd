import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Collapse, Descriptions, Divider, List, Modal, PageHeader, Tag, message } from 'antd';
import api from '../../../helpers/Api.js';
import moment from 'moment';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';

const { Panel } = Collapse;

class SentryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visible: false,
      deleteLoading: false,
      id: this.props.match.params.sentryID,
      data: [],
      notification: [],
      image: [],
      imageHistory: []
    }
    this.loadData();
    this.deleteSentry = this.deleteSentry.bind(this);
  }

  async loadData() {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    // load data
    const res = await api.getSentryInfo(this.state.id);

    if (res.code === api.code.ok) {
      this.setState({
        loading: false,
        data: res.data,
        notification: res.data.notification,
        image: res.data.image,
        imageHistory: res.data.imageHistory
      });
    } else {
      this.setState({
        loading: false
      });
      // error code: wrongParam, notExist
      let errorMsg;
      switch(res.code) {
        case api.code.wrongParam:
          errorMsg = 'Wrong sentry ID';
          break
        case api.code.notExist:
          errorMsg = 'Sentry is not existed'
          break
        default:
          errorMsg = 'Unknown error';
          break
      }
      Modal.error({
        title: errorMsg,
        onOk: () => { this.props.history.push('/dashboard') }
      });
    }
  }

  async deleteSentry() {
    this.setState({
      deleteLoading: true
    })

    const res = await api.removeSentry(this.state.id);

    if (res.code === api.code.ok) {
      this.props.history.push('/dashboard')
    } else {
      // wrong sentry ID
      message.error(res.detail);
    }

    this.setState({
      deleteLoading: false
    })
  }

  getHistoryImageURL(filename) {
    return api.getHistoryImage(filename);
  }

  showModal = () => {
    this.setState({
      visible: true,
      deleteLoading: false
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { intl } = this.props;
    return (
      <DashboardLayout page='home'>
        <PageHeader
          title={'Sentry Detail: ' + this.state.data.name}
          onBack={() => {this.props.history.push('/dashboard');}}
          extra={
            <Button
              type='primary'
              icon={<DeleteOutlined />}
              size='default'
              onClick={this.showModal}
              danger
            >
              Delete Sentry
            </Button>
          }
        />
        <Modal
          title='Delete Sentry'
          visible={this.state.visible}
          onOk={this.deleteSentry}
          onCancel={this.handleCancel}
          footer={[
            <Button
              key='submit'
              type='primary'
              loading={this.state.deleteLoading}
              onClick={this.deleteSentry}
              danger
            >
              {intl.formatMessage({ id: 'yes' })}
            </Button>
          ]}
        >
          {intl.formatMessage({ id: 'sentryRemoveText' })}
        </Modal>
        <Divider />
        <List loading={this.state.loading}>
          <Descriptions column={2} style={{ paddingBottom: '24px' }} bordered>
            <Descriptions.Item label='Create Time'>{moment(this.state.data.createdAt).format('MMMM Do YYYY, h:mm A')}</Descriptions.Item>
            <Descriptions.Item label='Last Check Time'>{moment(this.state.data.lastCheckTime).fromNow()}</Descriptions.Item>
            <Descriptions.Item label='Notification Method'>
              { this.state.notification.type === 'email' ?
                <div>
                  <Tag color='#87d068'>Email</Tag>
                  <FormattedMessage
                    id='defaultEmail'
                    defaultMessage='Default Email'
                  />
                </div>
                :
                <div>
                  <Tag color='#4b90de'>ServerChan</Tag>
                  { this.state.notification.name }
                </div>
              }
            </Descriptions.Item>
            <Descriptions.Item label='Interval'>
              {this.state.data.interval >= 60 ? 
              <div>{ this.state.data.interval === 60 ?
                <div>{this.state.data.interval / 60 + ' hour'}</div> : 
                <div>{this.state.data.interval / 60 + ' hours'}</div>}</div> : 
              <div>{this.state.data.interval + ' minutes'}</div> }
              </Descriptions.Item>
            <Descriptions.Item label='Checked Count'>{this.state.data.checkCount}</Descriptions.Item>
            <Descriptions.Item label='Notified Count'>{this.state.data.notifyCount}</Descriptions.Item>
          </Descriptions>
        </List>
        <Collapse defaultActiveKey={['1']} style={{ marginBottom: '16px' }}>
          <Panel header='Screenshot History' key='1' showArrow={false}>
            <List 
              loading={this.state.loading}
              itemLayout='vertical'
              dataSource={this.state.imageHistory}
              pagination={{ pageSize: 3 }}
              renderItem={item => (
                <List.Item
                  extra={
                    <img
                      width={272}
                      alt='screenshot'
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

export default injectIntl(withRouter(SentryDetail));

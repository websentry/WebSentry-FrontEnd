import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import DashboardLayout from '../../../layouts/DashboardLayout';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Collapse,
  Descriptions,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  List,
  Modal,
  PageHeader,
  Switch,
  Tag,
  Tooltip,
  message,
} from 'antd';
import api from '../../../helpers/Api.js';
import moment from 'moment';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';
import { UserContext } from '../../../UserContext';

const { Panel } = Collapse;

class SentryDetail extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      deleteVisible: false,
      deleteLoading: false,
      updateVisible: false,
      updateLoading: false,
      updateMsg: '',
      id: this.props.match.params.sentryID,
      data: [],
      notification: [],
      image: [],
      imageHistory: [],
      url: '',
    };
    this.deleteSentry = this.deleteSentry.bind(this);
    this.updateSentry = this.updateSentry.bind(this);
  }

  componentDidMount() {
    this.loadData();
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
        imageHistory: res.data.imageHistory,
        url: res.data.task.url,
      });
    } else {
      this.setState({
        loading: false,
      });
      // error code: invalidParam, notExist
      let errorMsg;
      switch (res.code) {
        case api.code.invalidParam:
          errorMsg = 'Invalid sentry ID';
          break;
        case api.code.notExist:
          errorMsg = 'Sentry is not existed';
          break;
        default:
          errorMsg = 'Unknown error';
          break;
      }
      Modal.error({
        title: errorMsg,
        onOk: () => {
          this.props.history.push('/dashboard');
        },
      });
    }
  }

  getHistoryImageURL(filename) {
    return api.getHistoryImage(filename);
  }

  async deleteSentry() {
    this.setState({
      deleteLoading: true,
    });

    const res = await api.removeSentry(this.state.id);

    if (res.code === api.code.ok) {
      this.props.history.push('/dashboard');
    } else {
      // invalid sentry ID
      message.error(res.detail);
    }

    this.setState({
      deleteLoading: false,
    });
  }

  async updateSentry(values) {
    this.setState({
      updateLoading: true,
    });

    const { intl } = this.props;

    const res = await api.updatSentry(
      this.state.data.id,
      values['name'],
      this.state.data.notification.id,
      // TODO: threshold needs to be added
      1,
      values['interval'],
      values['runningState'] ? 1 : -1
    );

    if (res.code === api.code.ok) {
      this.setState({
        updateLoading: false,
        updateMsg: intl.formatMessage({ id: 'sentryDetailSuccessUpdate' }),
      });
      this.loadData();
      this.handleUpdateCancel();
      message.success(this.state.updateMsg);
    } else {
      this.setState({
        updateLoading: false,
        updateMsg: res.detail,
      });
      this.handleUpdateCancel();
      message.error(this.state.updateMsg);
    }
  }

  showDeleteModal = () => {
    this.setState({
      deleteVisible: true,
      deleteLoading: false,
    });
  };

  showUpdateModal = () => {
    this.setState({
      updateVisible: true,
      updateLoading: false,
    });
  };

  handleDeleteCancel = () => {
    this.setState({
      deleteVisible: false,
      deleteLoading: false,
    });
  };

  handleUpdateCancel = () => {
    this.setState({
      updateVisible: false,
      updateLoading: false,
    });
  };

  getInterval = () => {
    if (this.state.data.interval === 60) {
      return this.state.data.interval / 60 + ' hour';
    } else if (this.state.data.interval % 60 === 0) {
      return this.state.data.interval / 60 + ' hours';
    } else {
      return this.state.data.interval + ' minutes';
    }
  };

  render() {
    const { intl } = this.props;
    const formLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
    return (
      <UserContext.Consumer>
        {({ tz }) => (
          <DashboardLayout page="home">
            <PageHeader
              title={'Sentry Detail: ' + this.state.data.name}
              onBack={() => {
                this.props.history.push('/dashboard');
              }}
              extra={[
                <Button
                  key="update"
                  type="primary"
                  icon={<EditOutlined />}
                  size="default"
                  onClick={this.showUpdateModal}
                >
                  Update Sentry
                </Button>,
                <Button
                  key="delete"
                  type="primary"
                  icon={<DeleteOutlined />}
                  size="default"
                  onClick={this.showDeleteModal}
                  danger
                >
                  Delete Sentry
                </Button>,
              ]}
            />
            <Modal
              title="Delete Sentry"
              visible={this.state.deleteVisible}
              onCancel={this.handleDeleteCancel}
              footer={[
                <Button
                  key="submit"
                  type="primary"
                  loading={this.state.deleteLoading}
                  onClick={this.deleteSentry}
                  danger
                >
                  {intl.formatMessage({ id: 'yes' })}
                </Button>,
              ]}
            >
              {intl.formatMessage({ id: 'sentryRemoveText' })}
            </Modal>
            <Modal
              title="Update Sentry"
              closable={false}
              visible={this.state.updateVisible}
              onCancel={this.handleUpdateCancel}
              footer={null}
            >
              <Form
                {...formLayout}
                ref={this.formRef}
                onFinish={this.updateSentry}
                initialValues={{
                  name: this.state.data.name,
                  interval: this.state.data.interval,
                  runningState: this.state.data.runningState,
                }}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: 'sentryDetailInputName',
                      }),
                    },
                  ]}
                >
                  <Input style={{ width: '50%' }} />
                </Form.Item>
                <Form.Item
                  label={
                    <span>
                      Interval&nbsp;
                      <Tooltip title="Interval requires at least 15 minutes">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </span>
                  }
                  name="interval"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({
                        id: 'sentryDetailInputInterval',
                      }),
                    },
                  ]}
                >
                  <InputNumber min={15} step={5} style={{ width: '30%' }} />
                </Form.Item>
                <Form.Item
                  label="Running State"
                  name="runningState"
                  valuePropName="checked"
                >
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked={
                      this.state.data.runningState === 1 ? true : false
                    }
                  />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={this.state.updateLoading}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <Divider />
            <List loading={this.state.loading}>
              <Descriptions
                column={2}
                style={{ paddingBottom: '24px' }}
                bordered
              >
                <Descriptions.Item label="Sentry URL">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.url}
                  >
                    {this.state.url}
                  </a>
                </Descriptions.Item>
                <Descriptions.Item label="Running State">
                  {this.state.data.runningState === 1 ? (
                    <Badge status="processing" text="Running" />
                  ) : (
                    <Badge status="error" text="Paused" />
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Create Time">
                  {moment
                    .tz(this.state.data.createdAt, tz)
                    .format('MMM Do YYYY, h:mm A')}
                </Descriptions.Item>
                <Descriptions.Item label="Last Check Time">
                  {moment.tz(this.state.data.lastCheckTime, tz).fromNow()}
                </Descriptions.Item>
                <Descriptions.Item label="Notification Method">
                  {this.state.notification.type === 'email' ? (
                    <div>
                      <Tag color="#87d068">Email</Tag>
                      <FormattedMessage
                        id="defaultEmail"
                        defaultMessage="Default Email"
                      />
                    </div>
                  ) : (
                    <div>
                      <Tag color="#4b90de">ServerChan</Tag>
                      {this.state.notification.name}
                    </div>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Checked Count">
                  {this.state.data.checkCount}
                </Descriptions.Item>
                <Descriptions.Item label="Interval">
                  {this.getInterval()}
                </Descriptions.Item>
                <Descriptions.Item label="Notified Count">
                  {this.state.data.notifyCount}
                </Descriptions.Item>
              </Descriptions>
            </List>
            <Collapse
              defaultActiveKey={['1']}
              activeKey="1"
              style={{ marginBottom: '16px' }}
            >
              <Panel header="Screenshot History" key="1" showArrow={false}>
                <List
                  loading={this.state.loading}
                  itemLayout="vertical"
                  dataSource={this.state.imageHistory}
                  pagination={{
                    total: this.state.imageHistory.length,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`,
                    defaultPageSize: 3,
                    pageSizeOptions: [3, 5, 10, 20],
                  }}
                  renderItem={(item) => (
                    <List.Item
                      extra={
                        <Image
                          width={272}
                          alt="screenshot"
                          src={this.getHistoryImageURL(item.file)}
                        />
                      }
                    >
                      <List.Item.Meta
                        title={moment
                          .tz(item.createdAt, tz)
                          .format('MMMM Do YYYY, h:mm A')}
                        description={moment.tz(item.createdAt, tz).fromNow()}
                      />
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
          </DashboardLayout>
        )}
      </UserContext.Consumer>
    );
  }
}

export default injectIntl(withRouter(SentryDetail));

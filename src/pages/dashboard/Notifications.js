import React, { Component } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import {
  Button,
  Divider,
  Form,
  Input,
  List,
  message,
  Modal,
  PageHeader,
} from 'antd';
import DashboardLayout from '../../layouts/DashboardLayout';
import NotificationItem from './NotificationItem';
import { injectIntl } from 'react-intl';
import api from '../../helpers/Api.js';

class Notifications extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      notificationList: [],
      visible: false,
      addLoading: false,
      alertMsg: '',
    };
    this.handleServerChanSubmit = this.handleServerChanSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
    }
    // TODO: Handle loading state
    const res = await api.getAllNotifications();
    if (res.code === api.code.ok) {
      this.setState({
        isLoading: false,
        notificationList: res.data.notifications,
      });
    } else {
      // no error code
      this.setState({
        isLoading: false,
      });
      // no error code
      const { intl } = this.props;
      Modal.error({
        title: intl.formatMessage({ id: 'notificationFailGet' }),
        onOk: () => {
          window.location.reload();
        },
      });
    }
  }

  async handleServerChanSubmit(values) {
    this.setState({
      addLoading: true,
    });

    const { intl } = this.props;

    console.log('Received values of form: ', values);
    const res = await api.addServerChan(values['name'], values['sckey']);

    if (res.code === api.code.ok) {
      this.setState({
        addLoading: false,
        alertMsg: intl.formatMessage({ id: 'notificationSuccessAdd' }),
      });
      this.loadData();
      this.handleCancel();
      message.success(this.state.alertMsg);
      // reset the form values
      this.formRef.current.setFieldsValue({
        name: '',
        sckey: '',
      });
    } else {
      this.setState({
        addLoading: false,
        alertMsg: intl.formatMessage({ id: 'notificationFailAdd' }),
      });
      this.handleCancel();
      message.error(this.state.alertMsg);
    }
  }

  NotificationCard(item) {
    return <NotificationItem item={item} />;
  }

  showModal = () => {
    this.setState({
      visible: true,
      addLoading: false,
    });
  };

  handleOk = () => {
    this.setState({
      addLoading: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
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
      <DashboardLayout page="notifications">
        <div page="dashboardNotifications">
          <PageHeader
            title="Notification Methods"
            extra={
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                size="default"
                style={{ marginLeft: '32px' }}
                onClick={this.showModal}
              >
                Create Notification Method
              </Button>
            }
          />
          <Divider style={{ marginBottom: '0px' }} />
          <List
            itemLayout="horizontal"
            loading={this.state.isLoading}
            dataSource={this.state.notificationList}
            renderItem={this.NotificationCard}
          />
          <Modal
            title="Create Notification Method"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[]}
          >
            <h3>ServerChan</h3>
            <Form
              {...formLayout}
              ref={this.formRef}
              onFinish={this.handleServerChanSubmit}
              style={{ marginTop: '24px' }}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    type: 'string',
                    message: intl.formatMessage({
                      id: 'notificationInvalidString',
                    }),
                  },
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'notificationServerChanName',
                    }),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="SCKEY"
                name="sckey"
                rules={[
                  {
                    type: 'string',
                    message: intl.formatMessage({
                      id: 'notificationInvalidString',
                    }),
                  },
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: 'notificationServerChanSCKEY',
                    }),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item {...tailLayout} style={{ marginBottom: '0px' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.state.addLoading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </DashboardLayout>
    );
  }
}

export default injectIntl(Notifications);

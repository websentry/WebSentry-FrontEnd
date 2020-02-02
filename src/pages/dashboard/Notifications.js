import React, { Component } from 'react';
import { Button, Divider, Form, Input, List, message, Modal, PageHeader } from 'antd';
import NotificationItem from './NotificationItem';
import { injectIntl } from 'react-intl'; 
import api from '../../helpers/Api.js';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      notificationList: [],
      visible: false,
      addLoading: false,
      alertMsg: ""
    };
    this.loadData();
    this.handleServerChanSubmit = this.handleServerChanSubmit.bind(this);
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

  async handleServerChanSubmit(e) {
    this.setState({
      addLoading: true,
    });

    e.preventDefault();
    const { intl } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const res = await api.addServerChan(values['name'], values['sckey']);

        if (res.code === api.code.ok) {
          this.setState({
            addLoading: false,
            alertMsg: intl.formatMessage({ id: "notificationSuccessAdd" })
          });
          this.loadData();
          this.handleCancel();
          this.props.form.resetFields();
          message.success(this.state.alertMsg);
        } else {
          this.setState({
            addLoading: false,
            alertMsg: err['sentryName']['errors'][0]['message']
          });
          this.handleCancel();
          this.props.form.resetFields();
          message.error(this.state.alertMsg);
        }
      }
    });
  }

  NotificationCard(item) {
    return (
      <NotificationItem item={item} />
    )
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk (e) {
    this.setState({
      addLoading: true,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { intl } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        lg: { span: 6 },
        md: { span: 8 },
        sm: { span: 12 },
      },
      wrapperCol: {
        lg: { span: 18 },
        md: { span: 16 },
        sm: { span: 12 },
      },
    };
    return (
      <div page="dashboardNotifications">
        <PageHeader 
          title={<h2>Notification Methods</h2>}
          extra={
            <Button
              type="primary"
              icon="plus-circle"
              size="default"
              style={{ marginLeft: "32px" }}
              onClick={this.showModal}
            >
              Create Notification Method
            </Button>
          }
        />
        <Divider style={{ marginBottom: "0px" }}/>
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
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={this.state.addLoading}
              onClick={this.handleServerChanSubmit}
            >
              Submit
            </Button>,
          ]}
        >
          <h3>ServerChan</h3>
          <Form {...formItemLayout} onSubmit={this.handleServerChanSubmit}>
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                rules: [
                  {
                    type: 'string',
                    message: intl.formatMessage({ id: "notificationInvalidString" }),
                  },
                  {
                    required: true,
                    message: intl.formatMessage({ id: "notificationServerChanName" }),
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="SCKEY">
              {getFieldDecorator('sckey', {
                rules: [
                  {
                    type: 'string',
                    message: intl.formatMessage({ id: "notificationInvalidString" }),
                  },
                  {
                    required: true,
                    message: intl.formatMessage({ id: "notificationServerChanSCKEY" }),
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default injectIntl(Form.create()(Notifications));

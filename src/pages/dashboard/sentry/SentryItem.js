import React, { Component } from 'react';
import { ClockCircleOutlined, DeleteOutlined, LinkOutlined, ProjectOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Card, List, Modal, Tag, Tooltip, message } from 'antd';
import api from '../../../helpers/Api.js';
import { injectIntl } from 'react-intl';
import moment from 'moment';

const { Meta } = Card;

class TaskItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      loading: false,
      alertMsg: "",
    }
    this.item = this.props.item;

    this.confirm = this.confirm.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
      loading: false
    });
  };

  hideModal = e => {
    this.setState({
      visible: false,
      loading: false
    });
  };

  async confirm() {
    const { intl } = this.props;
    Modal.confirm({
      title: "Sentry: " + this.item.name,
      icon: <ExclamationCircleOutlined />,
      content: intl.formatMessage({ id: "sentryRemoveText" }),
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        console.log(this.item);
        const res = await api.removeSentry(this.item.id);
        if (res.code === api.code.ok) {
          window.location.reload();
        } else {
          message.error(res.detail);
        }
      },
      onCancel: () => {
        this.hideModal();
      },
    });
  }

  render() {
    return (
      <List.Item>
        <Card
          title={this.item.name}
          className="task-card"
          actions={[
            <Tooltip title="Detail">
              <Button href={"/dashboard/sentry/" + this.item.id} type="link">
                <ProjectOutlined style={{ fontSize: "16px"}} />
              </Button>
            </Tooltip>,
            <Tooltip title="Delete">
              <Button type="link" onClick={this.confirm}>
                <DeleteOutlined style={{ fontSize: "16px", color: "#f5222d" }} />
              </Button>
            </Tooltip>
          ]}
        >
          <Meta
            description={
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Tooltip title="URL">
                          <Tag>
                            <LinkOutlined />
                          </Tag>
                        </Tooltip>
                      </td>
                      <td>
                        <span>{this.item.url}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Tooltip title="Last check">
                          <Tag>
                            <ClockCircleOutlined />
                          </Tag>
                        </Tooltip>
                      </td>
                      <td>
                        <span>{moment(this.item.lastCheckTime).fromNow()}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }
          />
        </Card>
      </List.Item>
    );
  }
}

export default injectIntl(TaskItem);

import React, { Component } from 'react';
import {
  ClockCircleOutlined,
  DeleteOutlined,
  LinkOutlined,
  ProjectOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, List, Modal, Tag, Tooltip, message } from 'antd';
import api from '../../../helpers/Api.js';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { UserContext } from '../../../UserContext.js';

const { Meta } = Card;

class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.prop = props;
    this.state = {
      visible: false,
      loading: false,
      alertMsg: '',
    };
    this.confirm = this.confirm.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
      loading: false,
    });
  };

  hideModal = (e) => {
    this.setState({
      visible: false,
      loading: false,
    });
  };

  async confirm() {
    const { intl } = this.prop;
    Modal.confirm({
      title: 'Sentry: ' + this.prop.item.name,
      icon: <ExclamationCircleOutlined style={{ color: '#f5222d' }} />,
      content: intl.formatMessage({ id: 'sentryRemoveText' }),
      okText: intl.formatMessage({ id: 'yes' }),
      okType: 'danger',
      cancelText: intl.formatMessage({ id: 'no' }),
      onOk: async () => {
        const res = await api.removeSentry(this.prop.item.id);
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
      <UserContext.Consumer>
        {({ tz }) => (
          <List.Item>
            <Card
              title={this.prop.item.name}
              className="task-card"
              actions={[
                <Tooltip title="Detail" key="detail">
                  <Button type="link">
                    <Link to={'/dashboard/sentry/' + this.prop.item.id}>
                      <ProjectOutlined
                        style={{ fontSize: '16px', color: '#1890ff' }}
                      />
                    </Link>
                  </Button>
                </Tooltip>,
                <Tooltip title="Delete" key="delete">
                  <Button type="link" onClick={this.confirm}>
                    <DeleteOutlined
                      style={{ fontSize: '16px', color: '#f5222d' }}
                    />
                  </Button>
                </Tooltip>,
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
                            <span>{this.prop.item.url}</span>
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
                            <span>
                              {this.prop.item.lastCheckTime
                                ? moment
                                    .tz(this.prop.item.lastCheckTime, tz)
                                    .fromNow()
                                : 'Initializing...'}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      </UserContext.Consumer>
    );
  }
}

export default injectIntl(TaskItem);

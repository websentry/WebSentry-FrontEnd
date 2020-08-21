import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { List, Tag, Tooltip } from 'antd';

class TaskItem extends Component {
  render() {
    return (
      <List.Item
        style={{ paddingLeft: '24px', paddingRight: '24px' }}
        actions={[
          <Tooltip title="Delete" key="delete">
            <DeleteOutlined style={{ fontSize: '18px', color: '#f5222d' }} />
          </Tooltip>,
          <Tooltip title="Edit" key="edit">
            <EditOutlined style={{ fontSize: '18px', color: '#1890ff' }} />
          </Tooltip>,
        ]}
      >
        {this.props.item.type.localeCompare('email') ? (
          <List.Item.Meta
            title={
              <div>
                {this.props.item.name}
                <Tag color="#4b90de" style={{ marginLeft: '8px' }}>
                  ServerChan
                </Tag>
              </div>
            }
            description={this.props.item.detail}
          />
        ) : (
          <List.Item.Meta
            title={
              <div>
                <FormattedMessage
                  id="defaultEmail"
                  defaultMessage="Default Email"
                />
                <Tag color="#87d068" style={{ marginLeft: '8px' }}>
                  Email
                </Tag>
              </div>
            }
            description={this.props.item.detail}
          />
        )}
      </List.Item>
    );
  }
}

export default TaskItem;

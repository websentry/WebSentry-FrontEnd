import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { List, Tag, Tooltip } from 'antd';

class TaskItem extends Component {
  constructor(props){
    super(props);
    this.item = this.props.item;
  }

  render() {
    return (
      <List.Item
        style={{ paddingLeft: "24px", paddingRight: "24px" }}
        actions={[
          <Tooltip title="Delete">
            <DeleteOutlined style={{ fontSize: "18px", color: "#f5222d" }} />
          </Tooltip>,
          <Tooltip title="Edit">
            <EditOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
          </Tooltip>
        ]}
      >
        { this.item.type.localeCompare("email") ?
          <List.Item.Meta
            title={
              <div>
                {this.item.name}
                <Tag color="#4b90de" style={{ marginLeft: "8px" }}>ServerChan</Tag>
              </div>
            }
            description={this.item.detail}
          />
        :
          <List.Item.Meta
            title={
              <div>
                <FormattedMessage
                  id='defaultEmail'
                  defaultMessage='Default Email'
                />
                <Tag color="#87d068" style={{ marginLeft: "8px" }}>Email</Tag>
              </div>
            }
            description={this.item.detail}
          />
        }
      </List.Item>
    );
  }
}

export default TaskItem;

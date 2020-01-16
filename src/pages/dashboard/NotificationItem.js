import React, { Component } from 'react';
import { Icon, List, Tooltip } from 'antd';

class TaskItem extends Component {
  constructor(props){
    super(props);
    this.item = this.props.item;
  }

  render() {
    return (
      <List.Item
        actions={[
          <Tooltip title="Delete">
            <Icon type="delete" style={{ fontSize: "18px", color: "#f5222d" }} />
          </Tooltip>,
          <Tooltip title="Edit">
            <Icon type="edit" style={{ fontSize: "18px", color: "#1890ff" }} />
          </Tooltip>
        ]}
      >
        { this.item.type.localeCompare("email") ?
          <List.Item.Meta
            title="ServerChan"
            description={this.item.setting.sckey}
          />
        :
          <List.Item.Meta
            title="Email"
            description={this.item.setting.email}
          />
        }
      </List.Item>
    );
  }
}

export default TaskItem;

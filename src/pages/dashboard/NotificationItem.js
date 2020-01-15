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
          <a key="delete">
            <Tooltip title="Delete">
              <Icon type="delete" style={{ fontSize: "18px" }} />
            </Tooltip>
          </a>,
          <a key="edit">
            <Tooltip title="Edit">
              <Icon type="edit" style={{ fontSize: "18px" }} />
            </Tooltip>
          </a>
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

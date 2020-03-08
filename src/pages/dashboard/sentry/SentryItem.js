import React, { Component } from 'react';
import { ClockCircleOutlined, EditOutlined, LinkOutlined, ProjectOutlined } from '@ant-design/icons';
import { Card, Tooltip, List, Tag, Button } from 'antd';
import moment from 'moment';

const { Meta } = Card;

class TaskItem extends Component {
  constructor(props){
    super(props);
    this.item = this.props.item;
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
                <ProjectOutlined />
              </Button>
            </Tooltip>,
            <Tooltip title="Edit">
              <Button type="link">
                <EditOutlined />
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

export default TaskItem;

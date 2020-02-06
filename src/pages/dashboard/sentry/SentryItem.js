import React, { Component } from 'react';
import { Card, Icon, Tooltip, List, Tag, Button } from 'antd';
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
              <Button href={"/dashboard/sentry/" + this.item.id}>
                <Icon type="project" />
              </Button>
            </Tooltip>,
            <Tooltip title="Edit">
              <Button>
                <Icon type="edit" />
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
                            <Icon type="link" />
                          </Tag>
                        </Tooltip>
                      </td>
                      <td>
                        <span>{this.item.url}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Tooltip title="last check">
                          <Tag>
                            <Icon type="clock-circle" />
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

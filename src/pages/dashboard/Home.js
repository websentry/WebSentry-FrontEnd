import React, { Component } from 'react';
import { Card, Icon, Tooltip, PageHeader, Divider, Button, List, Tag } from 'antd';
import moment from 'moment'
import api from '../../helpers/Api';
import './Home.less'


const { Meta } = Card;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: [],
    };
    this.loadData();
  };

  async loadData() {
    if (!this.state.isLoading) {
      this.setState({isLoading: true});
    }

    const response = await api.getAllSentries();
    if (response.code === api.code.ok) {
      this.setState({
        isLoading: false,
        data: response.data.sentries,
      });
    } else {
      console.log("---- Error ----");
      console.log(response);
    }

  }

  taskCard(item) {
    return (
      <List.Item>
        <Card
          title={item.name}
          className="task-card"
          actions={[
            <Tooltip title="detail">
              <Icon type="project" />
            </Tooltip>,
            <Tooltip title="edit">
              <Icon type="edit" />
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
                        <span>{item.url}</span>
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
                        <span>{moment(item.lastCheckTime).fromNow()}</span>
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

  render() {

    return (
      <div>
        <PageHeader title="Active Tasks" extra={<Button type="primary" icon="plus-circle" size="default" onClick={() => {this.props.history.push('new-task');}} >Create task</Button>} />
        <Divider />

        <List
          loading={this.state.isLoading}
          grid={{
            gutter: 4, xs: 1, sm: 1, md: 2, xl: 3, xxl: 4,
          }}
          dataSource={this.state.data}
          renderItem={this.taskCard}
        />

      </div>
    );
  }
}

export default Home;

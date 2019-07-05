import React, { Component } from 'react';
import { Card, PageHeader, Divider, Button, List, Modal, Spin } from 'antd';
import NewTask from './NewTask';
import TaskItem from './task/TaskItem';
import { UserContext } from '../../UserContext';
import api from '../../helpers/Api';
import './Home.less'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      createTaskVisible: false,
      data: [],
    };
    this.loadData();
    this.showCreateTask = this.showCreateTask.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  };


  onCloseModal(e) {
    console.log(e);
    this.setState({ createTaskVisible: false });
  };

  showCreateTask() {
    this.setState({ createTaskVisible: true });
  }

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
      <TaskItem item={item}/>
    );
  }

  render() {
    return (
      <div>
        <NewTask
          visible={this.state.createTaskVisible}
          onCloseModal={this.onCloseModal}
        />
        <PageHeader
          title="Active Tasks"
          extra={
            <Button
              type="primary"
              icon="plus-circle"
              size="default"
              onClick={this.showCreateTask}>
              Create task
            </Button>
          }
        />
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

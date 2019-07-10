import React, { Component } from 'react';
import { PageHeader, Divider, Button, List } from 'antd';
import NewTask from './NewTask';
import TaskItem from './task/TaskItem';
import api from '../../helpers/Api';
import './Home.less'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      createTaskVisible: false,
      data: [],
      notificationList:[]
    };
    this.loadData();
    this.showCreateTask = this.showCreateTask.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  };

  componentWillMount() {
  }

  onCloseModal(e) {
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
    const response2 = await api.getAllNotifications();

    console.log(response);
    console.log(response2);
    if (response.code === api.code.ok && response2.code === api.code.ok) {
      this.setState({
        isLoading: false,
        data: response.data.sentries,
        notificationList: response2.data.notifications
      });
    } else {
      console.log("---- Error ----");
      console.log(response);
      console.log(response2);
    }

  }

  taskCard(item) {
    return (
      <TaskItem item={item}/>
    );
  }

  renderNewTask(){
    if(this.state.isLoading === false){
      return (
        <NewTask
          visible={this.state.createTaskVisible}
          notificationList={this.state.notificationList}
          onCloseModal={this.onCloseModal}
        />
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderNewTask()}
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

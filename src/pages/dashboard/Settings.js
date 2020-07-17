import React, { Component } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, Col, Row, TreeSelect, Button, PageHeader, Divider } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import api from '../../helpers/Api.js';

const Language = [
  {
    title: 'English',
    value: 'en-US',
  },
  {
    title: '简体中文',
    value: 'zh-Hans',
  },
];

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      timezone: '',
      loading: false
    }
    this.loadData();
    this.updateSetting = this.updateSetting.bind(this);
  }

  async loadData() {
    const response = await api.getUserInfo();

    if (response.code === api.code.ok) {
      this.setState({
        language: response.data.language,
        timezone: response.data.timeZone,
      })
    } else {
      console.log('---- Error ----');
      console.log(response);
    }
  }

  onLanguageChange = e => {
    this.setState({ language: e });
  };

  onTimezoneChange = e => {
    this.setState({ timezone: e });
  };

  async updateSetting(e) {
    this.setState({
      loading: true
    });

    const response = await api.updateSetting(this.state.language, this.state.timezone);
    if (response.code === api.code.ok) {
      this.setState({
        loading: false
      });
      window.location.reload();
    } else {
      console.log('---- Error ----');
      console.log(response);
    }
  }

  render() {
    var moment = require('moment-timezone');
    var local_timezone = moment.tz.guess();
    var timezones = moment.tz.names();
    var timezone_dict = [];
    for (var i in timezones) {
      timezone_dict.push({
        title: '(GMT' + moment.tz(timezones[i]).format('Z') + ') ' + timezones[i],
        value: timezones[i],
        key: timezones[i],
      });
    }

    return (
      <DashboardLayout page='settings'>
        <div>
          <PageHeader 
            title='Setting'
            extra={
              <Button
                key='submit'
                type='primary'
                size='default'
                icon={<CheckCircleOutlined />}
                loading={this.state.loading}
                onClick={this.updateSetting}
              >
                Save
              </Button>
            }
          />
          <Divider style={{ marginBottom: '0px' }} />
          <Card bordered={false}>
            <Row style={{ marginBottom: '24px' }}>
              <Col span={8}><h3>Language</h3></Col>
              <Col span={16}>
                <TreeSelect
                  showSearch
                  style={{ width: '50%', fontSize: '16px' }}
                  value={ this.state.language }
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={ Language }
                  placeholder='Please select'
                  treeDefaultExpandAll
                  onChange={ this.onLanguageChange }
                  defaultValue={ this.state.language }
                />
              </Col>
            </Row>
            <Row style={{marginBottom: '24px'}}>
              <Col span={8}><h3>Timezone</h3></Col>
              <Col span={16}>
                <TreeSelect
                  showSearch
                  style={{ width: '50%', fontSize: '16px' }}
                  value={ this.state.timezone }
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={ timezone_dict }
                  placeholder='Please select'
                  treeDefaultExpandAll
                  onChange={ this.onTimezoneChange }
                  defaultValue={ '(GMT' + moment.tz(this.state.timezone).format('Z') + ') ' + this.state.timezone }
                />
              </Col>
            </Row>
          </Card>
        </div>
      </DashboardLayout>
    );
  }
}

export default Settings;

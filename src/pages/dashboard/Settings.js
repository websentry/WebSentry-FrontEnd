import React, { Component } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, Col, Divider, PageHeader, Row, TreeSelect } from 'antd';
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

  onLanguageChange = value => {
    this.updateSetting(value, null);
  };

  onTimezoneChange = value => {
    this.updateSetting(null, value);
  };

  async updateSetting(lang, tz) {
    const response = await api.updateSetting(lang, tz);
    if (response.code === api.code.ok) {
      window.location.reload();
    } else {
      console.log('---- Error ----');
      console.log(response);
    }
  }

  render() {
    var moment = require('moment-timezone');
    // can be used for guessing the timezone
    // var local_timezone = moment.tz.guess();
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

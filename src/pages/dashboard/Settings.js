import React, { Component } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, Col, Row, TreeSelect, Button, PageHeader, Divider } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const Language = [
  {
    title: 'English',
    value: 'us',
  },
  {
    title: '简体中文',
    value: 'cn',
  },
];

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      timezone: '',
    }
  }

  onLanguageChange = e => {
    this.setState({ language: e });
  };

  onTimezoneChange = e => {
    this.setState({ timezone: e });
  };

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
      <DashboardLayout page='setting'>
        <div>
          <PageHeader 
            title='Setting'
            extra={
              <Button 
                type='primary'
                icon={<CheckCircleOutlined />}
                size='default'>
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
                  defaultValue={ '(GMT' + moment.tz(local_timezone).format('Z') + ') ' + local_timezone }
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

import React, { Component } from 'react';
import { Card, Col, Row, TreeSelect, Button, PageHeader, Divider } from 'antd';

const Language = [
  {
    title: 'English',
    value: 'English',
    key: 'us',
  },
  {
    title: '简体中文',
    value: '简体中文',
    key: 'cn',
  },
];

class Setting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      language: undefined,
      timezone: undefined,
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
        title: "(GMT" + moment.tz(timezones[i]).format('Z') + ") " + timezones[i],
        value: timezones[i],
        key: timezones[i],
      });
    }
    
    return (
      <div>
        <PageHeader 
          title={<h2>Setting</h2>}
          extra={
            <Button 
              type="primary"
              icon="check-circle"
              size="default">
              Save
            </Button>
          }
        />
        <Divider />
        <Card>
          <Row style={{marginBottom: '24px'}}>
            <Col span={8}><h3>Language</h3></Col>
            <Col span={16}>
              <TreeSelect
                showSearch
                style={{ width: '100%', fontSize: '16px' }}
                value={ this.state.language }
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={ Language }
                placeholder="Please select"
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
                style={{ width: '100%', fontSize: '16px' }}
                value={ this.state.timezone }
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={ timezone_dict }
                placeholder="Please select"
                treeDefaultExpandAll
                onChange={ this.onTimezoneChange }
                defaultValue={ "(GMT" + moment.tz(local_timezone).format('Z') + ") " + local_timezone }
              />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default Setting;

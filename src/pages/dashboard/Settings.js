import React, { Component } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Card, Col, Divider, Modal, PageHeader, Row, TreeSelect } from 'antd';
import { injectIntl } from 'react-intl';
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
    const res = await api.getUserInfo();

    if (res.code === api.code.ok) {
      this.setState({
        language: res.data.language,
        timezone: res.data.timeZone,
      })
    } else {
      // error code: notExist
      const { intl } = this.props;
      let errorMsg;
      switch(res.code) {
        case api.code.notExist:
          errorMsg = intl.formatMessage({ id: 'userInfoNotExist' })
          break
        default:
          errorMsg = intl.formatMessage({ id: 'unknownError' })
          break
      }

      Modal.error({
        title: errorMsg,
        onOk: () => { window.location.reload(); }
      });
    }
  }

  onLanguageChange = value => {
    this.updateSetting(value, null);
  };

  onTimezoneChange = value => {
    window.localStorage.setItem("disableTimeZoneDiffNotice", '');
    this.updateSetting(null, value);
  };

  async updateSetting(lang, tz) {
    const res = await api.updateSetting(lang, tz);
    if (res.code === api.code.ok) {
      window.location.reload();
    } else {
      // error code: wrongParam
      const { intl } = this.props;
      let errorMsg;
      switch(res.code) {
        case api.code.wrongParam:
          errorMsg = res.detail
          break
        default:
          errorMsg = intl.formatMessage({ id: 'unknownError' })
          break
      }
      Modal.error({
        title: errorMsg,
        onOk: () => { window.location.reload(); }
      });
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

export default injectIntl(Settings);

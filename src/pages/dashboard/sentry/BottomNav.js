import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import './BottomNav.less';

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.prop = props;
  }

  render() {
    let leftClassName = 'bottom-nav-left ' + this.prop.goBackClassName;
    let rightClassName = 'bottom-nav-right ' + this.prop.goNextClassName;
    return (
      <Row
        gutter={0}
        justify={'center'}
        type={'flex'}
        align={'middle'}
        style={{ marginTop: 30, minWidth: '100%' }}
      >
        <Col span={12} className={leftClassName}>
          <Button
            onClick={this.prop.goBack}
            size="large"
            disabled={this.prop.loading}
          >
            {this.prop.goBackButtonText}
          </Button>
        </Col>
        <Col span={12} className={rightClassName}>
          <Button
            type="primary"
            size="large"
            onClick={this.prop.goNext}
            htmlType="submit"
            loading={this.prop.loading}
          >
            {this.prop.goNextButtonText}
          </Button>
        </Col>
      </Row>
    );
  }
}

export default BottomNav;

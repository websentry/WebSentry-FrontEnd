import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import './BottomNav.less';

class BottomNav extends Component {

  render() {
    let leftClassName = "bottom-nav-left " + this.props.goBackClassName;
    let rightClassName = "bottom-nav-right " + this.props.goNextClassName;
    return (
      <Row gutter={0} justify={"center"} type = {"flex"} align={"middle"} style={{ marginTop: 30, minWidth: "100%" }}>
        <Col span={12} className={leftClassName}>
          <Button
            onClick={this.props.goBack}
            size="large"
            disabled={this.props.loading}
          >
            {this.props.goBackButtonText}
          </Button>
        </Col>
        <Col span={12} className={rightClassName}>
          <Button
            type="primary"
            size="large"
            onClick={this.props.goNext}
            htmlType="submit"
            loading={this.props.loading}
          >
            {this.props.goNextButtonText}
          </Button>
        </Col>
      </Row>
    );
  }
}

export default BottomNav;

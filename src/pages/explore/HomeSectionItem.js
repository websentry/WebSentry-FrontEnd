import React, { Component } from 'react';
import { Icon } from 'antd';

class HomeSectionItem extends Component {
  render() {
    return (
      <div className={this.props.style}>
        <div className="display-2">
          <Icon type={this.props.iconName} />
        </div>
        <h3>{this.props.title}</h3>
        <p>{this.props.msg}</p>
      </div>
    );
  }
}

export default HomeSectionItem;

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class BnnerItem extends Component {

  render() {
    const { msgId, headerId, bootstrapStyle, bgImage, style, tabIndex } = this.props;
    let topName = "carousel-item " + bgImage;
    return (
      <div className={topName} style={style} tabIndex ={tabIndex}>
        <div className="container">
          <div className={bootstrapStyle}>
            <div className="display-3 text-white">
              <FormattedMessage id={headerId}/>
            </div>
            <p className="lead">
              <FormattedMessage id={msgId}/>
            </p>
            <div href="#" className="btn btn-danger btn-lg">Sign Up Now</div>
          </div>
        </div>
      </div>
    );
  }
}

export default BnnerItem;

import React, { Component } from 'react';
import { Carousel } from 'antd';
import BannerItem from './BannerItem';
import './Banner.less';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.items = [
        {
          msgId: "bannerMsg1",
          headerId: "bannerHeader1",
          bootstrapStyle:"carousel-caption d-none d-sm-block text-right mb-5",
          bgImage:"carousel-image-1"
        },
        {
          msgId: "bannerMsg2",
          headerId: "bannerHeader2",
          bootstrapStyle:"carousel-caption d-none d-sm-block mb-5",
          bgImage:"carousel-image-1"
        },
        {
          msgId: "bannerMsg3",
          headerId: "bannerHeader3",
          bootstrapStyle:"carousel-caption d-none d-sm-block text-right mb-5",
          bgImage:"carousel-image-1"
        }
    ];
  }

  renderItems() {
    let items = [];
    for (let i = 0; i < this.items.length; i++) {
      const { msgId, headerId, bootstrapStyle, bgImage } = this.items[i];
      items.push(
        <BannerItem
          key = {i}
          msgId ={msgId}
          headerId =  {headerId}
          bootstrapStyle = {bootstrapStyle}
          bgImage = {bgImage}
        />
      );
    }
    return items
  }

  render() {
    return (
      <Carousel autoplay>
        {this.renderItems()}
      </Carousel>
    );
  }
}

export default Banner;

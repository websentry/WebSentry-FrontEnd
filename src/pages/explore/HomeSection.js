import React, { Component } from 'react';
import HomeSectionItem from './HomeSectionItem';

class HomeSection extends Component {
  constructor(props){
    super(props);
    this.items = [
        {
          style: "col-md-4 mb-4 text-center",
          iconName: "setting",
          title:"Turning Gears",
          msg:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, veniam."
        },
        {
          style: "col-md-4 mb-4 text-center",
          iconName: "cloud",
          title: "Sending Data",
          msg:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, veniam."
        },
        {
          style: "col-md-4 mb-4 text-center",
          iconName: "shopping-cart",
          title:"Making Money",
          msg:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, veniam."
        }
    ];
  }

  renderItems() {
    let items = [];
    for (let i = 0; i < this.items.length; i++) {
      const { style, iconName, title, msg } = this.items[i];
      items.push(
        <HomeSectionItem
          key = {i}
          style ={style}
          iconName = {iconName}
          title = {title}
          msg = {msg}
        />
      );
    }
    return items
  }

  render() {
    return (
      <section className="py-5">
        <div className="container">
          <div className="row">
            {this.renderItems()}
          </div>
        </div>
      </section>
    );
  }
}

export default HomeSection;

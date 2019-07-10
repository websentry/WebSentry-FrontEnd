import React, { Component } from 'react';
import laptop from "../../assets/laptop.png";

class HomeHeading extends Component {
  render() {
    return (
      <div>
        <section id="home-heading" className="p-5">
          <div className="dark-overlay">
            <div className="row">
              <div className="col">
                <div className="container pt-5">
                  <h1 className ="text-white">Are You Ready To Get Started?</h1>
                  <p className="d-none d-md-block">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est eaque magni sit dolores. Nisi, dolor nam modi perspiciatis
                    consequatur soluta.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="info" className="py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-6 align-self-center">
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eveniet blanditiis incidunt iusto corrupti illum
                  cum laudantium ex sequi amet.</p>
                <a href="about.html" className="btn btn-outline-danger btn-lg">Learn More</a>
              </div>
              <div className="col-md-6">
                <img src={laptop} alt="laptop" className="img-fluid"/>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomeHeading;

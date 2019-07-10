import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { Carousel,Icon } from 'antd';
import laptop from "../assets/laptop.png";
import Banner from "./explore/Banner";
import HomeSection from "./explore/HomeSection";

import './Explore.less';

class Explore extends React.Component {

  render() {
    return (
      <AppLayout>
        <Banner/>
        <HomeSection/>

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

        <section id="newsletter" className="text-center p-5 bg-dark text-white">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className ="text-white">Sign Up For Our Newsletter</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio asperiores consectetur, quae ducimus voluptates
                  vero repellendus architecto maiores recusandae mollitia?</p>
                <form className="form-inline justify-content-center">
                  <input type="text" className="form-control mb-2 mr-2" placeholder="Enter Name"/>
                  <input type="text" className="form-control mb-2 mr-2" placeholder="Enter Email"/>
                  <button className="btn btn-primary mb-2">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </AppLayout>
    );
  }
}

export default Explore;

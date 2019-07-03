import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { Carousel,Icon } from 'antd';
import laptop from "../assets/laptop.png";


import './Explore.less';

class Explore extends React.Component {

  render() {
    return (
      <AppLayout>
        <Carousel autoplay>
          <div className="carousel-item carousel-image-1">
            <div className="container">
              <div className="carousel-caption d-none d-sm-block text-right mb-5">
                <div className="display-3 text-white">Heading One</div>
                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, aperiam vel ullam deleniti reiciendis ratione
                  quod aliquid inventore vero perspiciatis.</p>
                <div href="#" className="btn btn-danger btn-lg">Sign Up Now</div>
              </div>
            </div>
          </div>
          <div className="carousel-item carousel-image-2">
            <div className="container">
              <div className="carousel-caption d-none d-sm-block mb-5">
                <div className="display-3">Heading Two</div>
                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, aperiam vel ullam deleniti reiciendis ratione
                  quod aliquid inventore vero perspiciatis.</p>
                <a href="#" className="btn btn-primary btn-lg">Learn More</a>
              </div>
            </div>
          </div>
          <div className="carousel-item carousel-image-3">
            <div className="container">
              <div className="carousel-caption d-none d-sm-block text-right mb-5">
                <div className="display-3">Heading Three</div>
                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, aperiam vel ullam deleniti reiciendis ratione
                  quod aliquid inventore vero perspiciatis.</p>
                <a href="#" className="btn btn-success btn-lg">Learn More</a>
              </div>
            </div>
          </div>
        </Carousel>

        <section className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-4 text-center">
                <div className="display-2">
                  <Icon type="setting" />
                </div>
                <h3>Turning Gears</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, veniam.</p>
              </div>
              <div className="col-md-4 mb-4 text-center">
                <div className="display-2">
                  <Icon type="cloud" />
                </div>
                <h3>Sending Data</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, veniam.</p>
              </div>
              <div className="col-md-4 mb-4 text-center">
                <div className="display-2">
                  <Icon type="shopping-cart" />
                </div>
                <h3>Making Money</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, veniam.</p>
              </div>
            </div>
          </div>
        </section>

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

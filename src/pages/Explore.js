import React from 'react';
import AppLayout from '../layouts/AppLayout';
import Banner from "./explore/Banner";
import HomeSection from "./explore/HomeSection";
import HomeHeading from "./explore/HomeHeading";

import './Explore.less';

class Explore extends React.Component {

  render() {
    return (
      <AppLayout>
        <Banner/>
        <HomeSection/>
        <HomeHeading/>
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

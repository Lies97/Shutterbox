import React, { Component } from 'react';
import { FiActivity, FiCast, FiMap } from "react-icons/fi";

const serviceList = [
  {
      icon: <FiActivity />,
      title: 'Fast Performance',
      description: 'Optimized for a smaller build size, faster dev compilation and dozens of other improvements.'
  },
  {
      icon: <FiCast />,
      title: 'Perfect Responsive',
      description: 'Our Template is full Perfect for all device. You can visit our template all device easily.'
  },
  {
      icon: <FiMap />,
      title: 'Fast & Friendly Support',
      description: 'We are provide 24 hours support for all clients.You can purchase without hesitation.'
  },
]

class Slider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pv-slider-area slider-wrapper">
        <div className="slider-activation">
          <div
            className="slide slide-style-1 slider-fixed--height d-flex align-items-center bg_image bg_image--34"
            data-black-overlay="9"
          >
            <div className="container position-relative">
              <div className="row">
                <div className="col-lg-12">
                  <div className="inner">
                    <h1 className="title theme-gradient">
                      Quick agency & portfolio template for your next website
                    </h1>
                  </div>
                </div>
              </div>

              <div className="service-wrapper service-white">
                <div className="row row--25">
                  {serviceList.map((val, i) => (
                    <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={i}>
                      <div className="service service__style--1">
                        <div className="icon">{val.icon}</div>
                        <div className="content">
                          <h4 className="title">{val.title}</h4>
                          <p>{val.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;

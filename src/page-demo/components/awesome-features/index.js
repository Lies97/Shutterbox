import React, { Component } from 'react';
import { FaReact, FaSass } from 'react-icons/fa';
import {
  FiSmartphone,
  FiCode,
  FiDownload,
  FiCommand,
  FiHeadphones,
  FiBold,
} from 'react-icons/fi';

const featureList = [
  {
    icon: <FaReact />,
    title: 'Latest React 16.8+',
    subtitle:
      'We used latest react vertion ^16.8.6.Its a awesome design made by react.',
  },
  {
    icon: <FiSmartphone />,
    title: 'Perfect Responsive',
    subtitle:
      'Our Template is full Perfect for all device. You can visit our template all device easily.',
  },
  {
    icon: <FiCode />,
    title: 'Well Documented Codes',
    subtitle:
      'The Imroz code is awesome well documented code. And Its customization is very easily',
  },
  {
    icon: <FaSass />,
    title: 'Sass Available',
    subtitle:
      'The tamplate has Sass available for css. You can Change css by sass',
  },
  {
    icon: <FiDownload />,
    title: 'Fast Loading Speed',
    subtitle:
      'Imroz is faster loading speed.Imroz create your theme so much faster ',
  },
  {
    icon: <FiCommand />,
    title: 'Modern Design',
    subtitle:
      'Imroz is a modern creatuve design for Creative Agency , Personal Portfolio etc....',
  },
  {
    icon: <FiHeadphones />,
    title: '24 Support System',
    subtitle:
      'We are provide 24 hours support for all clients.You can purchase without hesitation.',
  },
  {
    icon: <FiBold />,
    title: 'Bootstrap Comfortable',
    subtitle:
      'Bootstrap comfortable is available in Imroz. So layout changes is so much easily',
  },
];

class Features extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="feature" className="service-area bg_color--1 ptb--120">
        <div className="wrapper plr--120">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb--30">
                <span className="subtitle">Our Imroz Feature</span>
                <h2 className="title">Awesome Feature</h2>
              </div>
            </div>
          </div>
          <div className="row service-main-wrapper">
            {/* Start Single Feature  */}
            {featureList.map((value, i) => (
              <div
                className="col-lg-6 col-xl-3 col-md-6 col-sm-6 col-12"
                key={i}
              >
                <div className="service service__style--2 text-left">
                  <div className="icon">{value.icon}</div>
                  <div className="content">
                    <h3 className="title">{value.title}</h3>
                    <p className="subtitle">{value.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* End Single Feature  */}
          </div>
        </div>
      </div>
    );
  }
}

export default Features;

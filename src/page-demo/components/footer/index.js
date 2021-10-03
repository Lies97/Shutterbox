import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer
        className="pv-callto-action call-to-action-wrapper text-white-wrapper call-to-action ptb--120 bg_image bg_image--34"
        data-black-overlay="9"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner text-center">
                <span>
                  Purchase The Imroz and Make Your Site super faster and easy.
                </span>
                <h2 className="mt--20 theme-gradient font-700">
                  Let's go to Purchase
                </h2>
                <div className="footer-btn mt--35">
                  <a
                    className="btn-default"
                    target="_blank"
                    href="https://themeforest.net/checkout/from_item/31405042?license=regular"
                  >
                    <span>Purchase Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {};

export default Footer;

import React, { Component } from 'react';
import { FiX, FiMenu } from 'react-icons/fi';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  openMenu = () => {
    document.querySelector('.header-wrapper').classList.toggle('menu-open')
  }

  closeMenu = () => {
    document.querySelector('.header-wrapper').classList.remove('menu-open');
  }

  render() {
    return (
      <header
        className={`header-area header--transparent formobile-menu header--transparent color--black`}
      >
        <div className="header-wrapper" id="header-wrapper">
          <div className="header-left">
            <div className="logo">
              <a href="/">
                <img src="/assets/main-logo.svg" alt="Digital Agency" />
              </a>
            </div>
          </div>
          <div className="header-right">
            <nav className="mainmenunav d-lg-block">
              <ul className="mainmenu">
                <li>
                  <a href="#demo">View Demo</a>
                </li>
                <li>
                  <a href="#feature">Feature</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                <li>
                  <a target="_blank" href="http://rainbowit.net/docs/imroz/">
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://support.rainbowit.net/support/"
                  >
                    Friendly Support
                  </a>{' '}
                </li>
              </ul>
            </nav>

            <div className="header-btn">
              <a
                className="btn-default"
                target="_blank"
                href="https://themeforest.net/checkout/from_item/31405042?license=regular"
              >
                <span>Buy Now</span>
              </a>
            </div>
            {/* Start Humberger Menu  */}
            <div className="humberger-menu d-block d-lg-none pl--20 pl_sm--10">
              <span onClick={this.openMenu} className="menutrigger text-white">
                <FiMenu />
              </span>
            </div>
            {/* End Humberger Menu  */}
            <div className="close-menu d-block d-lg-none">
              <span onClick={this.closeMenu} className="closeTrigger">
                <FiX />
              </span>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;

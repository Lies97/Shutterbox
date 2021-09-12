import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiX, FiMenu } from 'react-icons/fi';

class Header extends Component {
  constructor(props) {
    super(props);
    window.addEventListener('load', function () {
      console.log('All assets are loaded');
    });
  }

  render() {
    const { logo, color = 'default-color' } = this.props;

    let logoUrl;
    if (logo === 'light') {
      logoUrl = (
        <img src="/assets/images/logo/logo-light.png" alt="Digital Agency" />
      );
    } else if (logo === 'dark') {
      logoUrl = (
        <img src="/assets/images/logo/logo-dark.png" alt="Digital Agency" />
      );
    } else if (logo === 'symbol-dark') {
      logoUrl = (
        <img
          src="/assets/images/logo/logo-symbol-dark.png"
          alt="Digital Agency"
        />
      );
    } else if (logo === 'symbol-light') {
      logoUrl = (
        <img
          src="/assets/images/logo/logo-symbol-light.png"
          alt="Digital Agency"
        />
      );
    } else {
      logoUrl = (
        <img src="/assets/images/logo/logo-02.png" alt="Digital Agency" />
      );
    }

    return (
      <header
        className={`header-area header--fixed formobile-menu header--transparent ${color}`}
      >
        <div className="header-wrapper" id="header-wrapper">
          <div className="header-left">
            <div className="logo">
              <a href="/">{logoUrl}</a>
            </div>
          </div>
          <div className="header-right">
            <nav className="mainmenunav d-lg-block">
              <ul className="mainmenu">
                <li className="has-droupdown">
                  <NavLink to="/" activeClassName="active" exact={true}>
                    Home
                  </NavLink>
                </li>
                <li className="has-droupdown">
                  <NavLink to="/order-brief" activeClassName="active">
                    Order Brief
                  </NavLink>
                </li>
                <li className="has-droupdown">
                  <NavLink to="/galleries" activeClassName="active">
                    Galleries
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/news" activeClassName="active">
                    News
                  </NavLink>
                </li>
                <li className="has-droupdown">
                  <NavLink to="/products" activeClassName="active">
                    Products
                  </NavLink>
                </li>
              </ul>
            </nav>

            <nav className="mainmenunav d-lg-block">
              <ul className="mainmenu">
                <li className="has-droupdown">
                  <div className="header-btn">
                    {/* <Link
                      className="btn-default btn-border btn-opacity disabled-without-grey"
                      to = '/'
                    > */}
                      <span className="btn-getting-started">Getting Started</span>
                    {/* </Link> */}
                  </div>{' '}
                  <ul className="submenu customize-submenu">
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                    <li>
                      <Link to="/login">Log In</Link>
                    </li>
                    <li>
                      <Link to="/order-brief">Order Brief</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>

            {/* Start Humberger Menu  */}
            <div className="humberger-menu d-block d-lg-none pl--20 pl_sm--10">
              <span
                onClick={this.menuTrigger}
                className="menutrigger text-white"
              >
                <FiMenu />
              </span>
            </div>
            {/* End Humberger Menu  */}
            <div className="close-menu d-block d-lg-none">
              <span onClick={this.CLoseMenuTrigger} className="closeTrigger">
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

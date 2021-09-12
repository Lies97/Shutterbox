import React, { Component } from 'react';
import {
  singleDemo,
  agencyDemo,
  busenessDemo,
  portfolioList,
  landingPage,
} from '../../mockData';
import Animate from '@charlesvien/react-animatecss';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class HomeDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAll: singleDemo,
      listAllOriginal: singleDemo,
      singleDemo: singleDemo,
      agencyDemo: agencyDemo,
      busenessDemo: busenessDemo,
      portfolioList: portfolioList,
      landingPage: landingPage,
      selectedList: singleDemo,
      searchWords: '',
      isLoading: false,
    };
  }

  setLoading = (isLoading) => {
    setTimeout(() => {
      this.setState({ isLoading });
    }, 1000);
  };

  handleSelect = (key) => {
    const { singleDemo, agencyDemo, busenessDemo, portfolioList, landingPage } =
      this.state;
    this.setState({ isLoading: true });
    switch (key) {
      case 1:
        this.setState({ listAll: agencyDemo, listAllOriginal: agencyDemo });
        this.setLoading(false);
        break;
      case 2:
        this.setState({ listAll: busenessDemo, listAllOriginal: busenessDemo });
        this.setLoading(false);
        break;
      case 3:
        this.setState({
          listAll: portfolioList,
          listAllOriginal: portfolioList,
        });
        this.setLoading(false);
        break;
      case 4:
        this.setState({ listAll: landingPage, listAllOriginal: landingPage });
        this.setLoading(false);
        break;
      default:
        this.setState({ listAll: singleDemo, listAllOriginal: singleDemo });
        this.setLoading(false);
        break;
    }
  };

  handleSearch = () => {
    const { searchWords } = this.state;
    this.setState({ isLoading: true });
    const { listAllOriginal } = this.state;
    const filteredList = listAllOriginal.filter((item) =>
      item.title.toLowerCase().includes(searchWords.toLowerCase())
    );

    if (!searchWords) {
      this.setState({ listAll: listAllOriginal });
    } else {
      this.setState({ listAll: filteredList });
    }

    this.setLoading(false);
  };

  handleEnter = (e) => {
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  };

  handleChangeSearch = (e) => {
    this.setState({ searchWords: e.target.value });
  };

  renderTabPanel = () => {
    const { listAll, isLoading } = this.state;
    return isLoading ? (
      <TabPanel></TabPanel>
    ) : (
      <div>
        <Animate
          animationIn="fadeInUp"
          animationOut="fadeOut"
          inDuration={1000}
          outDuration={1000}
          visible
          repeat={1}
        >
          <TabPanel className="row">
            {listAll.map((value, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="single-demo">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/${value.url} `}
                  >
                    <img
                      src={`/assets/images/preview/${value.imageUrl}`}
                      alt="Creative Agency Images"
                    />
                    <h3 className="title">
                      {value.title}
                      {value.label ? (
                        <span className="label-new">
                          <span>{value.label}</span>
                        </span>
                      ) : (
                        ''
                      )}
                    </h3>
                    <p className="info">{value.description}</p>
                  </a>
                </div>
              </div>
            ))}
          </TabPanel>
        </Animate>
      </div>
    );
  };

  renderTabItems = () => {
    return (
      <div className="d-flex">
        <Tab>
          <span>All Demo</span>
        </Tab>
        <Tab>
          <span>Agency</span>
        </Tab>
        <Tab>
          <span>Corporate</span>
        </Tab>
        <Tab>
          <span>Portfolio</span>
        </Tab>
        <Tab>
          <span>Landing</span>
        </Tab>
      </div>
    );
  };

  render() {
    const { isLoading, listAll, searchWords } = this.state;
    return (
      <div id="demo" className="home-demo-area bg_color--1 ptb--120">
        <div className="wrapper plr--120">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center pb--30">
                <h2 className="title theme-gradient">Home Demo</h2>
                <p>
                  Choose one of styles or cutomize easily your site following
                  your ideas. <br /> More demos are coming soon.
                </p>
              </div>
            </div>
            <div className="input-group search-bar col-md-4">
              <input
                className="form-control"
                type="search"
                placeholder="Search..."
                onKeyDown={this.handleEnter}
                onChange={this.handleChangeSearch}
              />
              <span className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => {
                    this.handleSearch();
                  }}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </span>
            </div>
          </div>
          <Tabs onSelect={this.handleSelect}>
            <div className="row text-center">
              <div className="col-lg-12">
                <div className="tablist-inner">
                  <TabList className="pv-tab-button text-center mt--30">
                    {this.renderTabItems()}
                  </TabList>
                </div>
              </div>
            </div>
            {this.renderTabPanel()}
            {this.renderTabPanel()}
            {this.renderTabPanel()}
            {this.renderTabPanel()}
            {this.renderTabPanel()}
          </Tabs>
          {!isLoading && listAll.length === 0 && (
            <Animate
              animationIn="fadeIn"
              animationOut="fadeOut"
              inDuration={1000}
              outDuration={1000}
              visible
              repeat={1}
            >
              <div className="no-data-error">No data matches your search</div>
            </Animate>
          )}
          {isLoading && (
            <div className="d-flex justify-content-center pt-4">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HomeDemo;

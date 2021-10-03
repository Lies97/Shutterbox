import React, { Component } from 'react';
import { innerDemo } from '../../mockData';
import Animate from '@charlesvien/react-animatecss';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class InnerPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAll: innerDemo,
      listAllOriginal: innerDemo,
      isLoading: false,
      searchWords: '',
    };
  }

  setLoading = (isLoading) => {
    setTimeout(() => {
      this.setState({ isLoading });
    }, 1000);
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
  }

  handleEnter = (e) => {
    if (e.keyCode === 13) {
      this.handleSearch(this.state.searchWords);
    }
  };

  handleChangeSearch = (e) => {
    this.setState({ searchWords: e.target.value });
  }

  render() {
    const { listAll, isLoading, searchWords } = this.state;
    return (
      <div className="home-demo-area bg_color--5 ptb--120">
        <div className="wrapper plr--120">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2 className="title theme-gradient">Inner Pages</h2>
                <p className="description">
                  Choose one of styles or cutomize easily your site following
                  your ideas
                </p>
              </div>
            </div>
            <div className="input-group search-bar col-md-4">
              <input
                className="form-control"
                type="search"
                placeholder="Search..."
                id="example-search-input"
                onKeyDown={this.handleEnter}
                onChange={this.handleChangeSearch}
              />
              <span className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={() => {this.handleSearch(searchWords)}}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </span>
            </div>
          </div>
          <div className={listAll.length === 0 ? `row justify-content-center pt-3` : `row`}>
            {!isLoading &&
              listAll.map((value, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-6 col-12">
                  <Animate
                    animationIn="fadeInUp"
                    animationOut="fadeOut"
                    inDuration={1000}
                    outDuration={1000}
                    visible
                    repeat={1}
                  >
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
                        <h3 className="title">{value.title}</h3>
                      </a>
                    </div>
                  </Animate>
                </div>
              ))}
            {!isLoading && (
              <Animate
                animationIn="fadeIn"
                animationOut="fadeOut"
                inDuration={1000}
                outDuration={1000}
                visible
                repeat={1}
              >
                {listAll.length === 0 && (
                  <div className="no-data-error">
                    No data matches your search
                  </div>
                )}
              </Animate>
            )}
          </div>
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

export default InnerPages;

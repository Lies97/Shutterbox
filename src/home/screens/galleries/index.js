import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHelmet from '../../../component/common/Helmet';
import Loading from '../../../component/common/Loading';
import Breadcrumb from '../../../elements/common/Breadcrumb';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from 'react-icons/fi';
import Header from '../../../component/header/Header';
import Footer from '../../../component/footer/FooterTwo';
import Truncate from 'react-truncate';
import Animate from '@charlesvien/react-animatecss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { fetchGalleries } from '../../../redux/actions/fetch-galleries';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setLoading } from '../../../redux/actions/setLoading';
import './style.scss';
const TabOne = [
  {
    image: '01',
    bigImage: '/assets/images/portfolio/big/dp-big--portfolio-01.jpg',
    category: 'Web Design',
    title: 'Design is a creative part',
  },
  {
    image: '02',
    bigImage: '/assets/images/portfolio/big/dp-big--portfolio-02.jpg',
    category: 'Mobile App',
    title: 'The service provide for designer',
  },
  {
    image: '03',
    bigImage: '/assets/images/portfolio/big/dp-big--portfolio-03.jpg',
    category: 'Web Design',
    title: 'Mobile App landing Design',
  },
  {
    image: '04',
    bigImage: '/assets/images/portfolio/big/dp-big--portfolio-04.jpg',
    category: 'Mobile App',
    title: 'Logo Design creativity',
  },
  {
    image: '05',
    bigImage: '/assets/images/portfolio/big/dp-big--portfolio-05.jpg',
    category: 'Web Design',
    title: 'T-shirt design is the part of design',
  },
  {
    image: '06',
    bigImage: '/assets/images/portfolio/big/dp-big--portfolio-06.jpg',
    category: 'Logo Design',
    title: 'Getting tickets to the big show',
  },
];

class Galleries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: 0,
      isOpen: false,
      searchWords: '',
      listAll: [],
      listAllOriginal: [],
    };
  }

  componentDidMount() {
    this.props.fetchGalleries();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.galleries.length !== state.listAllOriginal.length) {
      return {
        listAll: props.galleries,
        listAllOriginal: props.galleries,
      };
    }
    return null;
  }

  handleSearch = () => {
    const { searchWords } = this.state;
    this.props.setLoading(true);
    const { listAllOriginal } = this.state;
    const filteredList = listAllOriginal.filter((item) =>
      item.title.toLowerCase().includes(searchWords.toLowerCase())
    );

    if (!searchWords) {
      this.setState({ listAll: listAllOriginal });
    } else {
      this.setState({ listAll: filteredList });
    }

    setTimeout(() => {
      this.props.setLoading(false);
    }, 500);
  };

  handleEnter = (e) => {
    if (e.keyCode === 13) {
      this.handleSearch(this.state.searchWords);
    }
  };

  handleChangeSearch = (e) => {
    this.setState({ searchWords: e.target.value });
  };

  render() {
    const { tab1, isOpen, listAll, searchWords } = this.state;
    const { isLoading } = this.props;
    return (
      <div>
        <PageHelmet pageTitle="Galleries" />

        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />

        <Breadcrumb title={'Galleries'} />

        <main className="page-wrapper">
          <div className="rn-portfolio-area ptb--120 bg_color--1 line-separator">
            {isLoading && <Loading />}

            <div className="container">
              <div className="input-group search-bar col-md-5 px-0 search-input">
              <input
                className="form-control"
                type="search"
                placeholder="Search..."
                id="example-search-input"
                onKeyDown={this.handleEnter}
                onChange={this.handleChangeSearch}
              />
              <span className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => {
                    this.handleSearch(searchWords);
                  }}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </span>
              </div>
            </div>

            {!isLoading && listAll && (
              <div className="container">
                <div className="row">
                  {listAll.map((gallery, index) => (
                    <div className="col-lg-4" key={index}>
                      {isOpen && (
                        <Lightbox
                          mainSrc={listAll[tab1].urlToImage}
                          nextSrc={listAll[(tab1 + 1) % listAll.length]}
                          prevSrc={
                            listAll[
                              (tab1 + listAll.length - 1) % listAll.length
                            ]
                          }
                          onCloseRequest={() =>
                            this.setState({ isOpen: false })
                          }
                          onMovePrevRequest={() =>
                            this.setState({
                              tab1:
                                (tab1 + listAll.length - 1) % listAll.length,
                            })
                          }
                          onMoveNextRequest={() =>
                            this.setState({
                              tab1: (tab1 + 1) % listAll.length,
                            })
                          }
                        />
                      )}
                      <Animate
                        animationIn="fadeInUp"
                        animationOut="fadeOut"
                        inDuration={1000}
                        outDuration={1000}
                        visible
                        repeat={1}
                      >
                        <div className="item-portfolio-static">
                          <div
                            onClick={() =>
                              this.setState({ isOpen: true, tab1: index })
                            }
                          >
                            <div className="portfolio-static">
                              <div className="thumbnail-inner">
                                <div className="thumbnail embed-responsive embed-responsive-16by9">
                                  <a role="button">
                                    <img
                                      src={gallery.urlToImage}
                                      alt="Portfolio Images"
                                      className="embed-responsive-item text-center thumbnail-images"
                                    />
                                  </a>
                                </div>
                              </div>
                              <div className="content">
                                <div className="inner galleries-wrapper">
                                  <Truncate lines={1}>
                                    <p className="galleries-title">{gallery.title}</p>
                                  </Truncate>
                                  {/* <h4>
                                    <a role="button">
                                      <Truncate lines={2}>
                                        {gallery.description}
                                      </Truncate>
                                    </a>
                                  </h4> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Animate>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!isLoading && listAll.length === 0 && (
              <div className="row justify-content-center pt-4">
                <p className="mb-0">No data to display</p>
              </div>
            )}
          </div>
        </main>

        <div className="backto-top">
          <ScrollToTop showUnder={160}>
            <FiChevronUp />
          </ScrollToTop>
        </div>

        <Footer isLoading={isLoading} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.homeReducer.isLoading,
    galleries: state.homeReducer.galleries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGalleries: () => dispatch(fetchGalleries()),
    setLoading: (isLoading) => dispatch(setLoading(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Galleries);

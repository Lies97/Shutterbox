import React, { Component } from 'react';
import PageHelmet from '../../../component/common/Helmet';
import Breadcrumb from '../../../elements/common/Breadcrumb';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from 'react-icons/fi';
import Header from '../../../component/header/Header';
import Footer from '../../../component/footer/FooterTwo';
import { connect } from 'react-redux';
import { fetchNews } from '../../../redux/actions/news/fetch-news';
import { getNewsCategory } from '../../../redux/actions/news/get-news-category';
import { deleteNews } from '../../../redux/actions/news/delete-news';
import 'react-image-lightbox/style.css';
import Loading from '../../../component/common/Loading';
import Animate from '@charlesvien/react-animatecss';
import './style.scss';
import { Link } from 'react-router-dom';
import utils from '../../../helper';
import Modal from 'react-modal';
import FilterBar from './components/FitlerBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '500px',
  },
};
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: 0,
      isOpen: false,
      idToDelete: '',
    };
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    const { getNewsCategory, fetchNews } = this.props;
    fetchNews();
    getNewsCategory();
  }

  componentWillReceiveProps(nextProps) {
    const { deleteNewsData, deleteNewsError, createNewsData, fetchNews } =
      this.props;
    const {
      deleteNewsData: nextDeleteNewsData,
      deleteNewsError: nextDeleteNewsError,
      createNewsData: nextCreateNewsData,
    } = nextProps;

    if (nextDeleteNewsData && deleteNewsData !== nextDeleteNewsData) {
      fetchNews();
      this.handleModalState(false);
      this.handleAlert('Deleted post successfully!', false);
    } else if (nextDeleteNewsError && deleteNewsError !== nextDeleteNewsError) {
      this.handleAlert(nextDeleteNewsError);
    }

    if (nextCreateNewsData && createNewsData !== nextCreateNewsData) {
      this.handleAlert('Created Post Successfully!', false);
    }
  }

  renderActionBar = () => {
    const { history } = this.props;
    return (
      <div className="action-bar-wrapper d-flex justify-content-end mb-3 container">
        <div className="create-post-btn">
          <button
            className="btn btn-next"
            onClick={() => {
              history.push('/news/create');
            }}
          >
            Create Post
          </button>
        </div>
      </div>
    );
  };

  openDeletePostModal = (id) => {
    this.setState({ idToDelete: id });
    this.handleModalState(true);
  };

  handleModalState = (isOpen) => {
    this.setState({ isOpen });
  };

  handleDeletePost = () => {
    const { idToDelete: id } = this.state;
    const { deleteNews } = this.props;
    deleteNews(id);
  };

  handleAlert = (content, isError = true) => {
    isError
      ? toast.error(content, { autoClose: false })
      : toast.success(content, { theme: 'colored' });
  };

  getCategoryId = (categoryId) => {
    const { fetchNews } = this.props;
    fetchNews(categoryId);
  };

  render() {
    const { isLoading, news, deleteLoading, newsCategory } = this.props;

    const isAuthorized = utils.getSessionStorage('user');

    return (
      <div>
        <PageHelmet pageTitle="News" />

        {/* Start Header Area  */}
        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />
        {/* End Header Area  */}

        {/* Start Breadcrump Area */}
        <Breadcrumb title={'News'} />
        {/* End Breadcrump Area */}

        {/* Start Page Wrapper  */}
        <main className="page-wrapper">
          {/* Start Portfolio Area  */}
          <div className="creative-portfolio-wrapper ptb--120 bg_color--1">
            {isLoading && <Loading />}

            {isAuthorized &&
              isAuthorized.role === 'super_admin' &&
              this.renderActionBar()}

            {newsCategory && (
              <FilterBar
                category={newsCategory}
                getCategoryId={this.getCategoryId}
              />
            )}
            {!isLoading && news && (
              <div className="container plr--10 ptb--50">
                <div className="row row--5">
                  {news.map((data, i) => (
                    <div className="col-lg-4 col-md-6 col-12 mt_sm--30" key={i}>
                      <Animate
                        animationIn="fadeInUp"
                        animationOut="fadeOut"
                        inDuration={1000}
                        outDuration={1000}
                        visible
                        repeat={1}
                      >
                        <div className="portfolio-style--3 position-relative portfolio-wrapper">
                          {isAuthorized &&
                            isAuthorized.role === 'super_admin' && (
                              <FontAwesomeIcon
                                icon={['fas', 'times']}
                                className="position-absolute delete-icon-inside"
                                size="lg"
                                onClick={() =>
                                  this.openDeletePostModal(data.id)
                                }
                              />
                            )}

                          <div className="thumbnail">
                            <Link to={`/news/${data.id}`}>
                              <img
                                src={data.img_for_detail_post}
                                alt="Portfolio Images"
                                className="text-center thumbnail-images"
                              />
                            </Link>
                          </div>
                          <div className="content">
                            <p className="portfoliotype">{data.author}</p>
                            <h4 className="title">
                              <Link to={`/news/${data.id}`}>{data.title}</Link>
                            </h4>
                            <div className="portfolio-btn">
                              <Link
                                className="rn-btn text-white"
                                to={`/news/${data.id}`}
                              >
                                Read More
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Animate>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!isLoading && news.length === 0 && (
              <div className="container plr--10 ptb--50 text-center">
                No data to display
              </div>
            )}
          </div>
        </main>

        <Modal
          isOpen={this.state.isOpen}
          style={customStyles}
          contentLabel="Delete Button"
        >
          <div className="content-wrapper text-center">
            <h4 className="text-center">Delete Post</h4>
            <label className="label text-center mb--15">
              Do you confirm to delete this post?
            </label>
          </div>
          <div className="btn-wrapper d-flex justify-content-between">
            {deleteLoading && <Loading />}
            {!deleteLoading && (
              <button
                className="btn btn-next"
                onClick={() => this.handleDeletePost()}
              >
                Confirm
              </button>
            )}
            <button
              className={`btn btn-secondary ${deleteLoading ? 'disabled' : ''}`}
              onClick={() => this.handleModalState(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
        <div className="backto-top">
          <ScrollToTop showUnder={160}>
            <FiChevronUp />
          </ScrollToTop>
        </div>

        <ToastContainer
          position="bottom-center"
          theme="dark"
          style={{ width: '400px' }}
        />

        <Footer isLoading={isLoading} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.newsReducer.isLoading,
    deleteLoading: state.newsReducer.deleteLoading,
    news: state.newsReducer.news,
    deleteNewsData: state.newsReducer.deleteNewsData,
    deleteNewsError: state.newsReducer.deleteNewsData,
    createNewsData: state.newsReducer.createNewsData,
    newsCategory: state.newsReducer.newsCategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNews: (categoryId) => dispatch(fetchNews(categoryId)),
    getNewsCategory: () => dispatch(getNewsCategory()),
    deleteNews: (id) => dispatch(deleteNews(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);

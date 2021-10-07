import React, { Component } from 'react';
import { FiClock, FiUser, FiChevronUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ScrollToTop from 'react-scroll-up';
import PageHelmet from '../../../component/common/Helmet';
import Breadcrumb from '../../../elements/common/Breadcrumb';
import Header from '../../../component/header/Header';
import Footer from '../../../component/footer/FooterTwo';
import { connect } from 'react-redux';
import { fetchNewsById } from '../../../redux/actions/news/fetch-news';
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../component/common/Loading';

class PostDetails extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      post: {},
    };
    this.openModal = this.openModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { singleNewsError } = this.props;
    const { singleNewsError: nextSingleNewsError } = nextProps;
    if (nextSingleNewsError && nextSingleNewsError !== singleNewsError) {
      this.handleAlert(nextSingleNewsError);
    }
  }

  handleAlert = (content, isError = true) => {
    isError
      ? toast.error(content, { autoClose: false })
      : toast.success(content, { theme: 'colored' });
  };

  componentDidMount() {
    const { match: { params: { id } = {} } = {}, fetchNewsById } = this.props;
    fetchNewsById(id);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  getInnerHTML = (content) => {
    return { __html: content };
  };

  renderSection = (section) => {
    const { content, label } = section;

    const innerHTML = this.getInnerHTML(content);
    return (
      <div className="mt--40">
        <h4 className="">{label}</h4>
        <p dangerouslySetInnerHTML={innerHTML}></p>
      </div>
    );
  };

  render() {
    const { singleNewsData, isLoading } = this.props;

    return (
      <React.Fragment>
        <PageHelmet pageTitle="Post Details" />
        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />

        {/* Start Breadcrump Area */}
        <div
          className="rn-page-title-area pt--120 pb--190 position-relative"
          data-black-overlay="8"
        >
          {isLoading && <Loading className="center-loading" />}
          {!isLoading && singleNewsData && (
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="blog-single-page-title text-center pt--100">
                    <h2 className="title theme-gradient">
                      {singleNewsData.title}
                    </h2>
                    <ul className="blog-meta d-flex justify-content-center align-items-center">
                      <li className="d-flex align-items-center">
                        <FiClock />
                        {singleNewsData.created_at && (
                          <Moment format="MMMM D, YYYY">
                            {singleNewsData.created_at}
                          </Moment>
                        )}

                        {/* May 18, 2021 */}
                      </li>
                      <li className="d-flex align-items-center">
                        <FiUser />
                        {singleNewsData.author && `${singleNewsData.author.first_name} ${singleNewsData.author.last_name}`}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {!isLoading && singleNewsData && (
          <div className="rn-blog-details pt--110 pb--70 bg_color--1">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="inner-wrapper">
                    <div className="inner">
                      <p>{singleNewsData.description}</p>
                      <div className="thumbnail">
                        <img
                          src={singleNewsData.img_for_detail_post}
                          alt="Blog Images"
                          className="post-image"
                        />
                      </div>
                      {singleNewsData.section &&
                        singleNewsData.section.map((item) => {
                          return this.renderSection(item);
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* End Blog Details */}

        {/* Start BLog Comment Form  */}
        {!isLoading && singleNewsData && (
          <div className="blog-comment-form pb--120 bg_color--1">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="inner">
                    <div className="section-title">
                      <span className="subtitle">Have a Comment?</span>
                      <h2 className="title">Leave a Reply</h2>
                    </div>
                    <form className="mt--40" action="#">
                      <div className="row">
                        <div className="col-lg-6 col-md-12 col-12">
                          <div className="rnform-group">
                            <input type="text" placeholder="Name" />
                          </div>
                          <div className="rnform-group">
                            <input type="email" placeholder="Email" />
                          </div>
                          <div className="rnform-group">
                            <input type="text" placeholder="Website" />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12">
                          <div className="rnform-group">
                            <textarea
                              type="text"
                              placeholder="Comment"
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="blog-btn mt--30">
                            <Link className="btn-default" to="/blog-details">
                              <span>SEND MESSAGE</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* End BLog Comment Form  */}

        {/* Start Back To Top */}
        <div className="backto-top">
          <ScrollToTop showUnder={160}>
            <FiChevronUp />
          </ScrollToTop>
        </div>
        {/* End Back To Top */}

        <ToastContainer
          position="bottom-center"
          theme="dark"
          style={{ width: '400px' }}
        />
        <Footer isLoading={isLoading} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.homeReducer.isLoading,
    singleNewsData: state.newsReducer.singleNewsData,
    singleNewsError: state.newsReducer.singleNewsError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewsById: (id) => dispatch(fetchNewsById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);

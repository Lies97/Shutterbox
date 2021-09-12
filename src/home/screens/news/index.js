import React, { Component } from 'react';
import PageHelmet from '../../../component/common/Helmet';
import Breadcrumb from '../../../elements/common/Breadcrumb';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from 'react-icons/fi';
import Header from '../../../component/header/Header';
import Footer from '../../../component/footer/FooterTwo';
import { connect } from 'react-redux';
import { fetchNews } from '../../../redux/actions/fetch-news';
import 'react-image-lightbox/style.css';
import Loading from '../../../component/common/Loading';
import Animate from '@charlesvien/react-animatecss';
import './style.scss';
import { Link } from 'react-router-dom';
const PortfolioList = [
  {
    images: '7',
    category: 'Freelancer',
    title: 'The Language of Developer',
  },
  {
    images: '1',
    category: 'Freelancer',
    title: 'The new Thinking for Design',
  },
  {
    images: '2',
    category: 'Freelancer',
    title: 'The new Thinking for Design',
  },
  {
    images: '3',
    category: 'Freelancer',
    title: 'Getting tickets to the big show',
  },
  {
    images: '8',
    category: 'Freelancer',
    title: 'You can see your Portfolio',
  },
  {
    images: '9',
    category: 'Freelancer',
    title: 'Getting tickets to the big show',
  },
];

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: 0,
      isOpen: false,
    };
  }
  componentDidMount() {
    this.props.fetchNews();
  }
  render() {
    const { isLoading, news } = this.props;

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

            {!isLoading && news && (
              <div className="container plr--10">
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
                        <div className="portfolio-style--3">
                          <div className="thumbnail">
                            <Link to={`/news/${i}`}>
                              <img
                                src={data.urlToImage}
                                alt="Portfolio Images"
                                className="text-center thumbnail-images"
                              />
                            </Link>
                          </div>
                          <div className="content">
                            <p className="portfoliotype">{data.author}</p>
                            <h4 className="title">
                              <Link to={`/news/${i}`}>{data.title}</Link>
                            </h4>
                            <div className="portfolio-btn">
                              <Link
                                className="rn-btn text-white"
                                to={`/news/${i}`}
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
    news: state.homeReducer.news,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNews: () => dispatch(fetchNews()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);

import React, { Component } from 'react';
import PageHelmet from '../../../component/common/Helmet';
import Breadcrumb from '../../../elements/common/Breadcrumb';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from 'react-icons/fi';
import Header from '../../../component/header/Header';
import './style.scss';
import Footer from '../../../component/footer/FooterTwo';
import { connect } from 'react-redux';
import Loading from '../../../component/common/Loading';
import { fetchNews } from '../../../redux/actions/news/fetch-news';
import Animate from '@charlesvien/react-animatecss';

class Product extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchNews();
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="wrapper">
        <PageHelmet pageTitle="Products" />

        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />

        <Breadcrumb title={'Products'} />

        <main className="page-wrapper">
          {/* Start Portfolio Area  */}
          <div className="creative-portfolio-wrapper ptb--120 bg_color--1">
            {isLoading && <Loading />}

            {!isLoading && (
              <div className="container plr--10">
                <Animate
                  animationIn="fadeIn"
                  animationOut="fadeOut"
                  inDuration={1000}
                  outDuration={1000}
                  visible
                  repeat={1}
                >
                  {/* <div className="row row--5">
                    <div className="col-lg-4 col-md-6 col-12 mt_sm--30">
                    </div>
                  </div> */}
                  <div className="row justify-content-center">
                    <p className="mb-0">No data to display</p>
                  </div>
                </Animate>
              </div>
            )}
          </div>
        </main>

        <div className="backto-top">
          <ScrollToTop showUnder={160}>
            <FiChevronUp />
          </ScrollToTop>
        </div>

        <Footer isLoading={true} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.homeReducer.isLoading,
    news: state.newsReducer.news,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNews: () => dispatch(fetchNews()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

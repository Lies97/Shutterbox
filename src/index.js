// React Required
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import store from './redux/store';
// Create Import File
import './index.scss';

// Common Layout
// import Layout from "./component/common/App";

import PageScrollTop from './component/PageScrollTop';

// Home layout
import Demo from './page-demo/Demo';
import MainDemo from './home/MainDemo';
import Startup from './home/Startup';
import Paralax from './home/Paralax';
import DigitalAgency from './home/DigitalAgency';
import CreativeAgency from './home/CreativeAgency';
import PersonalPortfolio from './home/PersonalPortfolio';
import Business from './home/Business';
import StudioAgency from './home/StudioAgency';
import PortfolioLanding from './home/PortfolioLanding';
import CreativeLanding from './home/CreativeLanding';
import HomeParticles from './home/HomeParticles';
import CreativePortfolio from './home/CreativePortfolio';
import DesignerPortfolio from './home/DesignerPortfolio';
import InteriorLanding from './home/Interior';
import CorporateBusiness from './home/CorporateBusiness';
import OrderBrief from './home/screens/order-brief';
import Galleries from './home/screens/galleries';
import News from './home/screens/news';
import Products from './home/screens/products';
import Register from './home/screens/register';
import Login from './home/screens/login';

// Dark Home Layout 
import DarkMainDemo from './dark/MainDemo';
import DarkPortfolioLanding from './dark/PortfolioLanding';
import HomePortfolio from './dark/HomePortfolio';

// Element Layout
import Service from "./elements/Service";
import ServiceDetails from "./elements/ServiceDetails";
import About from "./elements/About";
import Contact from "./elements/Contact";
import PortfolioDetails from "./elements/PortfolioDetails";
import Blog from "./elements/Blog";
import BlogDetails from "./elements/BlogDetails";
import error404 from "./elements/error404";


// Blocks Layout
import Team from "./blocks/Team";
import Counters from "./blocks/Counters";
import Testimonial from "./blocks/Testimonial";
import Portfolio from "./blocks/Portfolio";
import VideoPopup from "./blocks/VideoPopup";
import Gallery from "./blocks/Gallery";
import Brand from "./blocks/Brand";
import ProgressBar from "./blocks/ProgressBar";
import ContactForm from "./blocks/ContactForm";
import GoogleMap from "./blocks/GoogleMap";
import Columns from "./blocks/Columns";
import PricingTable from "./blocks/PricingTable";
import Button from "./blocks/Button";


import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import configureStore from './redux/store';

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

class Root extends Component{
    render(){
        return(
            <BrowserRouter basename={'/'}>
                <PageScrollTop>
                    <Switch>
                        <Route exact path={`${process.env.PUBLIC_URL}/`} component={MainDemo}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/demo`} component={Demo}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/dark-main-demo`} component={DarkMainDemo}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/startup`} component={Startup}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/paralax`} component={Paralax}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/digital-agency`} component={DigitalAgency}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/creative-agency`} component={CreativeAgency}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/personal-portfolio`} component={PersonalPortfolio}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/studio-agency`} component={StudioAgency}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/business`} component={Business}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/portfolio-home`} component={HomePortfolio}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/portfolio-landing`} component={PortfolioLanding}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/creative-landing`} component={CreativeLanding}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/home-particles`} component={HomeParticles}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/dark-portfolio-landing`} component={DarkPortfolioLanding}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/designer-portfolio`} component={DesignerPortfolio}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/creative-portfolio`} component={CreativePortfolio}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/interior-landing`} component={InteriorLanding}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/corporate-business`} component={CorporateBusiness}/>

                        {/* Element Layot */}
                        <Route exact path={`${process.env.PUBLIC_URL}/order-brief`} component={OrderBrief}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/galleries`} component={Galleries}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/news`} component={News}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/products`} component={Products}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/register`} component={Register}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/service-details`} component={ServiceDetails}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/contact`} component={Contact}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/about`} component={About}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/news/:id`} component={PortfolioDetails}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/blog`} component={Blog}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/blog-details`} component={BlogDetails}/>


                        {/* Blocks Elements  */}
                        <Route exact path={`${process.env.PUBLIC_URL}/button`} component={Button}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/team`} component={Team}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/counters`} component={Counters}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/testimonial`} component={Testimonial}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/portfolio`} component={Portfolio}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/video-popup`} component={VideoPopup}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/gallery`} component={Gallery}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/clint-logo`} component={Brand}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/progressbar`} component={ProgressBar}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/contact-form`} component={ContactForm}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/google-map`} component={GoogleMap}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/columns`} component={Columns}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/pricing-table`} component={PricingTable}/>
                        


                        
                        <Route path={`${process.env.PUBLIC_URL}/404`} component={error404}/>
                        <Route component={error404}/>

                    </Switch>
                </PageScrollTop>
            </BrowserRouter>
        )
    }
}
ReactDOM.render(
    <Provider store={store}>

      <React.StrictMode>

        <Root />

      </React.StrictMode>

    </Provider>,
  document.getElementById('root'),
);

PropTypes.resetWarningCache();
serviceWorker.register();

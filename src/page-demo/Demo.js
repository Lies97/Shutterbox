import React, { Component } from "react";
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import Header from "./components/header";
import Slider from "./components/slider";
import HomeDemo from "./components/home-demo";
import InnerPages from "./components/inner-pages";
import Features from "./components/awesome-features";
import Qna from "./components/q-and-a";
import Footer from "./components/footer";

class Demo extends Component {
    constructor(props) {
        super(props);
        window.addEventListener('load', function() {
            console.log('All assets are loaded')
        })
    }

    render() {
        var elements = document.querySelectorAll('.has-droupdown > a');
        for(var i in elements) {
            if(elements.hasOwnProperty(i)) {
                elements[i].onclick = function() {
                    this.parentElement.querySelector('.submenu').classList.toggle("active");
                    this.classList.toggle("open");
                }
            }
        }
        return (
            <div className="active-dark">
                {/* Start Banner Area  */}

                <Header onCloseMenu={this.closeMenu} onOpenMenu={this.openMenu} />
                <Slider />
                
                <div className="main-wrapper">
                    <HomeDemo />
                    <InnerPages />
                    <Features />
                    <Qna />
                    <Footer />
                </div>

                {/* End Preview Main Wrapper */}
                {/* Start Back To Top */}
                <div className="backto-top">
                    <ScrollToTop showUnder={160}>
                        <FiChevronUp />
                    </ScrollToTop>
                </div>
                {/* End Back To Top */}
            </div>
        )
    }
}
export default Demo;
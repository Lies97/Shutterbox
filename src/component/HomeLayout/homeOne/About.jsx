import React, { Component } from "react";
import { FiSend } from "react-icons/fi";

import { Link } from 'react-router-dom';
class About extends Component{
    render(){
        let title = 'Make Potential Possible',
        description = `Natural born problem solvers, we're the Creative Team that help you realize your potential, reimagine your customer experience and reinvent your future - fast`

        return(
            <React.Fragment>
                <div className="about-wrapper">
                    <div className="container">
                        <div className="row row--35 align-items-center">
                            <div className="col-lg-5 col-md-12">
                                <div className="thumbnail">
                                    <img className="w-100" src="/assets/images/about/about.gif" alt="About Images"/>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-12">
                                <div className="about-inner inner">
                                    <div className="section-title">
                                        <div className="icon">
                                            <FiSend />
                                        </div>
                                        <h2 className="title">{title}</h2>
                                        <p className="description">{description}</p>
                                        <div className="purchase-btn">
                                            <Link className="btn-transparent" to="/">DISCOVER NOW</Link>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default About;
import React, { Component } from "react";
import { FiActivity, FiCast, FiMap } from "react-icons/fi";
import { Link } from "react-router-dom";

const ServiceList = [
    {
        icon: <FiActivity />,
        title: 'Amplify your assets',
        description: 'We work magic to leverage and reimagine existing assets, saving you time and money on production.'
    },
    {
        icon: <FiCast />,
        title: 'Get ads to the screen faster',
        description: 'Our “follow-the-sun” model and streamlined technology mean your ads are ready in days, not weeks.'
    },
    {
        icon: <FiMap />,
        title: 'Scale creative, not costs',
        description: 'Subscription pricing means you can scale creative for less, and more of your dollars reach the screen.'
    },
]
class ServiceOne extends Component{
    render(){
        return(
            <React.Fragment>
                <div className="row row--25">
                    {ServiceList.map( (val , i) => (
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={i}>
                            <div className="service service__style--1">
                                <div className="icon">
                                    {val.icon}
                                </div>
                                <div className="content">
                                    <Link to="/order-brief"><h4 className="title">{val.title}</h4>
                                    <p>{val.description}</p></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        )
    }
}
export default ServiceOne;
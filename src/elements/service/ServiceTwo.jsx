import React, { Component } from "react";
import { FiCast , FiLayers , FiUsers , FiMonitor ,FiChevronUp, FiMail, FiCopy } from "react-icons/fi";

const ServiceList = [
    {
        icon: <FiCast />,
        title: 'Planner Box',
        description: 'In-house design and production teams delivering world-class, handcrafted digital creative.'
    },
    {
        icon: <FiLayers />,
        title: 'Creative Box',
        description: 'Template library experts committed to making your projects a success.'
    },
    {
        icon: <FiUsers />,
        title: 'Solution Box',
        description: 'Specialized experts versed in cutting-edge, next-generation innovative ad formats'
    },
    {
        icon: <FiMonitor />,
        title: 'Success Box',
        description: 'Real-time co-creation workshops designed to up-skill and bring new ideas to life'
    },
    {
        icon: <FiMail />,
        title: 'Cloud Box',
        description: 'Cloud-based platform for managing all your Shuttlerock creative.'
    },
    {
        icon: <FiCopy />,
        title: 'Content Box',
        description: 'Explore a curated selection of resources, insights, and creative inspiration to help elevate your creative'
    },
]

class ServiceTwo extends Component{
    render(){
        let title = 'Create Without Compromise.',
        description = 'Create attention-worthy digital that moves from any asset, for every screen.',
        subtitle= 'What we can do for you';
        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center">
                                <span className="subtitle">{subtitle}</span>
                                <h2 className="title">{title}</h2>
                                <p className="description" dangerouslySetInnerHTML={{ __html: description }}></p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 col-12 mt--30">
                            <div className="row service-main-wrapper">
                                {ServiceList.map( (val , i) => (
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={i}>
                                        <a href="/service-details">
                                            <div className="service service__style--2 text-left">
                                                <div className="icon">
                                                    {val.icon}
                                                </div>
                                                <div className="content">
                                                    <h3 className="title">{val.title}</h3>
                                                    <p>{val.description}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default ServiceTwo;

import React, { Component } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from 'react-accessible-accordion';
class Qna extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="faq" className="pv-feaq-area bg_color--5 ptb--120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="section-title text-left pb--30">
                <span className="subtitle theme-gradient">
                  Check out our FAQ section to see if we can help.
                </span>
                <h2 className="title">Do you have any Question</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="faq-area">
                <Accordion className="accodion-style--1" preExpanded={'0'}>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        What is Imroz ? How does it work?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>
                        Welcome to Imroz React Creative Agency, React Portfolio
                        and Corporate Multi Purpose Template Built With React
                        JS. NO jQuery!. It works too much faster loading speed
                        and you can works too much comfortability.Imroz create
                        your website so much faster, use to use and Well
                        Documented Codes for your customization.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        How can I run Imroz react template?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>
                        You can run Imroz easily. First You'll need to have node
                        and npm on your machine. So Please open your command
                        prompt then check your node -v and npm -v Version. Goes
                        To Your your command prompt: then First:{' '}
                        <strong className="theme-color">npm install</strong>
                      </p>
                      <p>
                        At Last:{' '}
                        <strong className="theme-color">npm run start</strong>.
                        By the following way you can be run your project easily.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        How can I get the customer support?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>
                        After purchasing the product need you any support you
                        can be share with us with sending mail to{' '}
                        <a
                          className="theme-gradient"
                          href="mailto:rainbowit10@gmail.com"
                        >
                          rainbowit10@gmail.com
                        </a>
                        .
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Can I get update regularly and For how long do I get
                        updates?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>
                        Yes, We will get update the Imroz. And you can get it
                        any time. Next time we will comes with more feature. You
                        can be get update for unlimited times. Our dedicated
                        team works for update.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Can I change any component as I like?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>
                        Yes, You can change any component as you like. And By
                        the way you can build your website which you are choose.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        Can I build a complete project with this template?
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>
                        Yes, Why not. You can build a project and complete
                        website as you are like. More component are available
                        include in this templete. And you can be use it
                        following documentation.
                      </p>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Qna.propTypes = {};

export default Qna;

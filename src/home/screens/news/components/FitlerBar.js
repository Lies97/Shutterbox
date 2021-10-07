import React, { Component } from 'react';
import { Tabs, Tab, TabList } from 'react-tabs';

export default class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSelectTabs = (e) => {
    const { getCategoryId } = this.props;
    getCategoryId(e);
  };

  renderTabItems = (category) => {
    return (
      <div className="d-flex">
        <Tab>
          <span>All</span>
        </Tab>
        {category.map((i) => (
          <Tab tabIndex={i.id}>
            <span>{i.label}</span>
          </Tab>
        ))}
        {/* <Tab>
          <span>All Demo</span>
        </Tab>
        <Tab>
          <span>Agency</span>
        </Tab>
        <Tab>
          <span>Corporate</span>
        </Tab>
        <Tab>
          <span>Portfolio</span>
        </Tab>
        <Tab>
          <span>Landing</span>
        </Tab> */}
      </div>
    );
  };

  // category.map(() => <Tabs onSelect={this.handleSelectTabs}></Tabs>

  render() {
    const { category } = this.props;
    console.log('category', category);
    return (
      <div className="filter-bar container plr--10">
        {category.length > 0 && (
          <Tabs onSelect={this.handleSelectTabs}>
            <div className="row text-center">
              <div className="col-lg-12">
                <div className="tablist-inner">
                  <TabList className="pv-tab-button text-center mt--30">
                    {this.renderTabItems(category)}
                  </TabList>
                </div>
              </div>
            </div>
          </Tabs>
        )}
      </div>
    );
  }
}

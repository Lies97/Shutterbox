import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UploadFiles from '../../../components/UploadFiles';

const mockData = [
  { value: 'esport-games', label: 'Esport Games' },
  { value: 'test1', label: 'Test 1' },
  { value: 'test2', label: 'Test 2' },
  { value: 'test3', label: 'Test 3' },
  { value: 'test4', label: 'Test 4' },
];

const animatedComponents = makeAnimated();

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      isDisabled1: false,
      isDisabled2: true,
      isDisabled3: true,
      selectedIndex: 0,
    };
  }

  handleSelectCard = (key) => {
    const { handleProductState, productState } = this.props;

    handleProductState('selectedCard', key, () => {
      handleProductState('selectedType', 0, () => {
        handleProductState('selectedFormat', 0, () => {
          handleProductState(
            'totalPoints',
            productState.cardItem[this.props.productState.selectedCard].type[
              this.props.productState.selectedType
            ].totalPoints,
            () => {
              handleProductState('selectedFormat', 0, () => {
                this.props.onClearInput();
              });
            }
          );
        });
      });
    });

    this.setState({ files: [] });
  };

  handleSelectType = (key) => {
    const { handleProductState, productState } = this.props;
    handleProductState('selectedType', key, () => {
      handleProductState(
        'totalPoints',
        productState.cardItem[this.props.productState.selectedCard].type[
          this.props.productState.selectedType
        ].totalPoints,
        () => {
          handleProductState('selectedFormat', 0, () => {
            this.props.onClearInput();
          });
        }
      );
    });
  };

  handleSelectFormat = (key) => {
    const { handleProductState } = this.props;
    handleProductState('selectedFormat', key);
  };

  handleSelectTVCFormat = (key) => {
    const {
      handleProductState,
      productState: { selectedFormat },
    } = this.props;

    switch (key) {
      case 1:
        this.setState({
          isDisabled2: false,
          isDisabled1: true,
          isDisabled3: true,
        });
        break;
      case 2:
        this.setState({
          isDisabled3: false,
          isDisabled1: true,
          isDisabled2: true,
        });
        break;
      default:
        this.setState({
          isDisabled1: false,
          isDisabled2: true,
          isDisabled3: true,
        });
        break;
    }

    if (selectedFormat !== key) {
      this.props.onClearInput();
    }

    handleProductState('selectedFormat', key);
    this.setState({ selectedIndex: key });
  };

  handleFileUpload = (files) => {
    let filesArray = [];
    for (var key in files) {
      if (files.hasOwnProperty(key)) {
        filesArray = filesArray.concat(files[key]);
      }
    }

    this.setState({ files: filesArray });
  };

  handleDeleteFile = (file) => {
    const { files } = this.state;
    const filteredFiles = files.filter((f) => f.name !== file.name);
    this.setState({ files: filteredFiles });
  };

  renderAttachments = () => {
    const { files } = this.state;
    return files.map((file) => (
      <div className="d-flex align-items-center pr-2 attachment-zone">
        <FontAwesomeIcon icon={['fa', 'paperclip']} size="xs" />
        <span className="d-inline-block pl-2">{file.name}</span>
        <div
          className="delete-wrapper pl-1"
          onClick={() => this.props.handleDeleteFile(file)}
        >
          <FontAwesomeIcon icon={['fas', 'times']} size="xs" />
        </div>
      </div>
    ));
  };

  renderCheckboxes = (checkboxes) => {
    const { onChangeInput = () => {} } = this.props;
    return checkboxes.map((checkbox) => (
      <div className="first-box d-inline-block position-relative mr-3">
        <input
          type="checkbox"
          checked={checkbox.isChecked}
          value={checkbox.value}
          onChange={(e) => onChangeInput(e)}
          id={checkbox.id}
        />
        <label className="pl--20 mb-0 ml-1 mr-2 label" htmlFor={checkbox.id}>
          {checkbox.label}
        </label>
      </div>
    ));
  };

  renderTVCFormat1 = () => {
    const {
      productState: { tvcVideoFormat },
    } = this.props;

    return tvcVideoFormat.map((data, index) => {
      let isDisabled = null;
      if (index === 0) {
        isDisabled = this.state.isDisabled1;
      } else if (index === 1) {
        isDisabled = this.state.isDisabled2;
      } else {
        isDisabled = this.state.isDisabled3;
      }
      return (
        <>
          <Tab
            className="item mr-2 w--30 text-center my-2 d-inline-block mr-3"
            selectedClassName="active-item"
          >
            {data.label}
          </Tab>
          <div
            className={`d-inline-block w--60 ${isDisabled ? 'disabled' : ''}`}
          >
            {this.renderCheckboxes(data.checkboxes)}
          </div>
        </>
      );
    });
  };

  renderTypeTabPanel = (index, tabName) => {
    const { files } = this.state;
    const {
      productState: { selectedFormat },
    } = this.props;

    if (tabName === 'ui-ux') {
      switch (index) {
        case 1:
          return (
            <Tabs
              onSelect={this.handleSelectFormat}
              selectedIndex={selectedFormat}
            >
              <div className="tablist-inner d-block">
                <label className="ptb--10 mb-0 label">Format</label>
                <TabList className="pv-tab-button">
                  <div className="d-flex w-100">
                    <div className="d-flex">
                      <Tab className="item" selectedClassName="active-item">
                        Desktop
                      </Tab>
                      <Tab
                        className="item mx-4"
                        selectedClassName="active-item"
                      >
                        Mobile
                      </Tab>
                    </div>
                  </div>
                </TabList>
              </div>
            </Tabs>
          );
        case 2:
          return (
            <Tabs
              onSelect={this.handleSelectFormat}
              selectedIndex={selectedFormat}
            >
              <div className="tablist-inner d-block">
                <label className="ptb--10 mb-0 label">Format</label>
                <TabList className="pv-tab-button">
                  <div className="d-flex w-100">
                    <div className="d-flex">
                      <Tab className="item" selectedClassName="active-item">
                        Desktop
                      </Tab>
                      <Tab
                        className="item mx-4"
                        selectedClassName="active-item"
                      >
                        Mobile
                      </Tab>
                    </div>
                  </div>
                </TabList>
              </div>
            </Tabs>
          );
        default:
          return <div></div>;
      }
    } else if (tabName === 'marketing-ads') {
      switch (index) {
        case 1:
          return (
            <Tabs
              onSelect={this.handleSelectFormat}
              selectedIndex={selectedFormat}
            >
              <div className="tablist-inner d-block">
                <label className="ptb--10 mb-0 label">Format</label>
                <TabList className="pv-tab-button">
                  <div className="d-flex w-100">
                    <div className="d-flex">
                      <Tab className="item" selectedClassName="active-item">
                        Desktop
                      </Tab>
                      <Tab
                        className="item mx-4"
                        selectedClassName="active-item"
                      >
                        Mobile
                      </Tab>
                      <Tab className="item" selectedClassName="active-item">
                        Responsive
                      </Tab>
                    </div>
                  </div>
                </TabList>
              </div>
            </Tabs>
          );
        case 2:
          return (
            <Tabs
              onSelect={this.handleSelectTVCFormat}
              selectedIndex={selectedFormat}
            >
              <div className="tablist-inner d-block">
                <label className="ptb--10 mb-0 label">Format</label>
                <TabList className="pv-tab-button">
                  <div className="d-flex w-100">
                    <div className="w-100">{this.renderTVCFormat1()}</div>
                  </div>
                </TabList>
              </div>
            </Tabs>
          );
        case 3:
          return (
            <Tabs
              onSelect={this.handleSelectFormat}
              selectedIndex={selectedFormat}
            >
              <div className="tablist-inner d-block">
                <label className="ptb--10 mb-0 label">Format</label>
                <TabList className="pv-tab-button">
                  <div className="d-flex w-100">
                    <div className="d-flex">
                      <Tab className="item" selectedClassName="active-item">
                        Package
                      </Tab>
                      <Tab
                        className="item mx-4"
                        selectedClassName="active-item"
                      >
                        Other
                      </Tab>
                    </div>
                  </div>
                </TabList>
              </div>
            </Tabs>
          );
        default:
          return (
            <Tabs
              onSelect={this.handleSelectFormat}
              selectedIndex={selectedFormat}
            >
              <div className="tablist-inner d-block">
                <label className="ptb--10 mb-0 label">Format</label>
                <TabList className="pv-tab-button">
                  <div className="d-flex w-100">
                    <div className="d-flex">
                      <Tab className="item" selectedClassName="active-item">
                        1:1 (1080 x 1080)
                      </Tab>
                      <Tab
                        className="item mx-4"
                        selectedClassName="active-item"
                      >
                        4:5 (1080 x 1350)
                      </Tab>
                      <Tab className="item" selectedClassName="active-item">
                        16:9 (1920 x 1080)
                      </Tab>
                    </div>
                  </div>
                </TabList>
              </div>
            </Tabs>
          );
      }
    } else {
      switch (index) {
        case 1:
        case 2:
        default:
          return <div></div>;
      }
    }
  };

  renderTabItems = () => {
    return (
      <div className="d-flex w-100">
        <Tab
          className="card card-container px-3 w-100"
          selectedClassName="active-tab"
        >
          <div className="card-body text-center">
            <FontAwesomeIcon
              icon={['fab', 'windows']}
              className="icons"
              size="lg"
            />
            <h5 className="card-title">UI/UX</h5>
          </div>
        </Tab>
        <Tab
          className="card card-container px-3 mx--50 w-100"
          selectedClassName="active-tab"
        >
          <div className="card-body text-center">
            <FontAwesomeIcon
              icon={['fab', 'youtube']}
              className="icons"
              size="lg"
            />
            <h5 className="card-title">Marketing Ads</h5>
          </div>
        </Tab>
        <Tab
          className="card card-container px-3 w-100"
          selectedClassName="active-tab"
        >
          <div className="card-body text-center">
            <FontAwesomeIcon
              icon={['fas', 'images']}
              className="icons"
              size="lg"
            />
            <h5 className="card-title">Art work</h5>
          </div>
        </Tab>
      </div>
    );
  };

  renderUIUXTab = () => (
    <div className="d-flex">
      <Tab className="item" selectedClassName="active-item">
        Banner
      </Tab>
      <Tab className="item mx-4" selectedClassName="active-item">
        Page event
      </Tab>
      <Tab className="item" selectedClassName="active-item">
        New product
      </Tab>
    </div>
  );

  renderMarketingAdsTab = () => (
    <div className="d-flex">
      <Tab className="item" selectedClassName="active-item">
        Banner
      </Tab>
      <Tab className="item mx-4" selectedClassName="active-item">
        Landing page
      </Tab>
      <Tab className="item mr-4" selectedClassName="active-item">
        TVC / Video
      </Tab>
      <Tab className="item" selectedClassName="active-item">
        CPD
      </Tab>
    </div>
  );

  renderArtWorkTab = () => (
    <div className="d-flex mb--30">
      <Tab className="item" selectedClassName="active-item">
        Character
      </Tab>
      <Tab className="item mx-4" selectedClassName="active-item">
        Environment
      </Tab>
      <Tab className="item" selectedClassName="active-item">
        Card game
      </Tab>
    </div>
  );

  renderTabPanel = (tabName) => {
    const { isLoading } = this.props;
    const {
      productState: { selectedType },
    } = this.props;

    return isLoading ? (
      <TabPanel></TabPanel>
    ) : (
      <div>
        <TabPanel className="tab-panel mt--30">
          <Tabs onSelect={this.handleSelectType} selectedIndex={selectedType}>
            <div className="tablist-inner d-block">
              <TabList className="pv-tab-button">
                <div className="d-flex w-100">
                  {tabName === 'ui-ux' && this.renderUIUXTab()}
                  {tabName === 'marketing-ads' && this.renderMarketingAdsTab()}
                  {tabName === 'art-work' && this.renderArtWorkTab()}
                </div>
              </TabList>
            </div>
            <TabPanel>{this.renderTypeTabPanel(0, tabName)}</TabPanel>
            <TabPanel>{this.renderTypeTabPanel(1, tabName)}</TabPanel>
            <TabPanel>{this.renderTypeTabPanel(2, tabName)}</TabPanel>
            <TabPanel>{this.renderTypeTabPanel(3, tabName)}</TabPanel>
          </Tabs>
        </TabPanel>
      </div>
    );
  };

  isNumberCase = (e) => {
    const symbolArr = ["e", "E", "+", "-", "."];
    return symbolArr.includes(e.key) && e.preventDefault()
  }

  render() {
    const {
      handleStep,
      productState: { productName, selectedCard, requirementText },
      handleProductState,
    } = this.props;

    return (
      <div className="product container mt-4">
        <div className="product-industry form-group">
          <label className="label mr-1">What's your Product name?</label>
          <span style={{ color: 'red' }} className="mb-2">
            *
          </span>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(e) => handleProductState('productName', e.target.value)}
            placeholder="Your product name"
          />
        </div>
        <div className="product-type">
          <label label className="label mr-1">
            What's kind of your Product?
          </label>
          <span style={{ color: 'red' }} className="mb-2">
            *
          </span>
          <Tabs onSelect={this.handleSelectCard} selectedIndex={selectedCard}>
            <div className="tablist-inner d-block">
              <TabList className="pv-tab-button">
                {this.renderTabItems()}
              </TabList>
            </div>
            {this.renderTabPanel('ui-ux')}
            {this.renderTabPanel('marketing-ads')}
            {this.renderTabPanel('art-work')}
          </Tabs>
        </div>
        <div className="quantity-wrapper d-flex w--36 align-items-center">
          <label className="mb-0">Quantity</label>
          <input
            className="form-control mb-0 ml-2"
            type="number"
            value={this.props.productState.quantity}
            min={1}
            onChange={(e) => {
              if (e.target.value < 0) e.target.value = 0;
              if (e.target.value > 100) e.target.value = 100;
              this.props.handleProductState('quantity', e.target.value);
            }}
            onKeyDown={this.isNumberCase}
          />
        </div>
        <label className="ptb--10 mb-0 label">Specific Requirement</label>
        <textarea
          className="form-control"
          rows="4"
          placeholder="Type your answer here.."
          value={requirementText}
          onChange={(e) =>
            handleProductState('requirementText', e.target.value)
          }
        ></textarea>
        <div className="d-flex mt--10">
          <UploadFiles
            isMulti={true}
            handleFileUpload={this.props.handleFileUpload}
            handleAlert={this.props.handleAlert}
            maxLength={5}
            fileUpload={this.props.fileUpload}
            onChange={this.props.onChangeFileInput}
            className="pr-2"
          />
          {this.props.files.length > 0 && this.props.renderAttachments()}
        </div>
        <div className="button-wrapper mt-2">
          <button
            className="btn btn-next btn-lg"
            onClick={() => handleStep('next', 0)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Product;

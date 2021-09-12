import React, { Component } from 'react';
import chroma from 'chroma-js';
import { Tab, Tabs, TabList } from 'react-tabs';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UploadFiles from '../../../components/UploadFiles';
import '../style.scss';

const mockData = [
  { value: 'orange', label: 'Orange', color: '#FF9A62' },
  { value: 'yellow', label: 'Yellow', color: '#FFD233' },
  { value: 'green', label: 'Green', color: '#4ECB71' },
  { value: 'blue', label: 'Blue', color: '#85B6FF' },
  { value: 'violet', label: 'Violet', color: '#D99BFF' },
  { value: 'brown', label: 'Brown', color: '#E4A951' },
  { value: 'dark', label: 'Dark', color: '#3E3E3E' },
  { value: 'white', label: 'White', color: '#757575' },
];

const mockIndustry = [
  { value: 'esport-game', label: 'Esports Game' },
  { value: 'test1', label: 'Test 1' },
  { value: 'test2', label: 'Test 2' },
  { value: 'test3', label: 'Test 3' },
  { value: 'test5', label: 'Test 5' },
  { value: 'test6', label: 'Test 6' },
  { value: 'test7', label: 'Test 7' },
  { value: 'test8', label: 'Test 8' },
  { value: 'test9', label: 'Test 9' },
  { value: 'test10', label: 'Test 10' },
  { value: 'test4', label: 'Test 4' },
];

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

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
          onClick={() => this.handleDeleteFile(file)}
        >
          <FontAwesomeIcon icon={['fas', 'times']} size="xs" />
        </div>
      </div>
    ));
  };

  handleFontTabs = (index) => {
    const { handleContentState } = this.props;
    handleContentState('fontTab', index);
  };

  handleHighlightContentTabs = (index) => {
    const { handleContentState } = this.props;
    handleContentState('highlightContentTab', index);
  };

  handleChangeRequirementText = (e) => {
    const { handleContentState } = this.props;
    handleContentState('requirementText', e.target.value);
  };

  handleColorSelect = (e) => {
    const { handleContentState } = this.props;
    handleContentState('colorSelect', e);
  };

  renderHighlightItems = () => {
    return (
      <div className="font-zone-wrapper w-50">
        <div className="d-flex w-100 font-zone">
          <Tab
            className="item font-tab text-center mr-2"
            selectedClassName="active-tab"
          >
            <h5 className="card-title mb-0">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect x="0.5" width="25" height="25" fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0"
                      transform="translate(0 -0.00539808) scale(0.00404858 0.00472335)"
                    />
                  </pattern>
                  <image
                    id="image0"
                    width="247"
                    height="214"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </h5>
          </Tab>
          <Tab
            className="item font-tab text-center mr-2"
            selectedClassName="active-tab"
          >
            <h5 className="card-title mb-0">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                className="pl--3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  width="25"
                  height="25"
                  d="M18.75 24.25L10 18L1.25 24.25V4.25C1.25 3.58696 1.51339 2.95107 1.98223 2.48223C2.45107 2.01339 3.08696 1.75 3.75 1.75H16.25C16.913 1.75 17.5489 2.01339 18.0178 2.48223C18.4866 2.95107 18.75 3.58696 18.75 4.25V24.25Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h5>
          </Tab>
          <Tab
            className="item font-tab text-center mr-2"
            selectedClassName="active-tab"
          >
            <h5 className="card-title mb-0">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  width="25"
                  height="25"
                  d="M20 1.25H10C5.16751 1.25 1.25 5.16751 1.25 10C1.25 14.8325 5.16751 18.75 10 18.75H20C24.8325 18.75 28.75 14.8325 28.75 10C28.75 5.16751 24.8325 1.25 20 1.25Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h5>
          </Tab>
          <Tab
            className="item font-tab text-center mr-2"
            selectedClassName="active-tab"
          >
            <h5 className="card-title mb-0">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  width="25"
                  height="25"
                  d="M12.0298 1.10915C12.4237 0.988776 12.8413 0.967586 13.2453 1.04747C13.6494 1.12735 14.0275 1.30583 14.3459 1.56703C14.6644 1.82824 14.9134 2.16409 15.0708 2.54472C15.2282 2.92535 15.2891 3.33897 15.2481 3.74881C15.2071 4.15865 15.0655 4.55201 14.8358 4.89393C14.6062 5.23584 14.2956 5.51572 13.9317 5.70868C13.5678 5.90164 13.1619 6.00171 12.75 5.99998H1.5M15.7798 20.8908C16.1737 21.0112 16.5913 21.0324 16.9953 20.9525C17.3994 20.8726 17.7775 20.6941 18.0959 20.4329C18.4144 20.1717 18.6634 19.8359 18.8208 19.4552C18.9782 19.0746 19.0391 18.661 18.9981 18.2511C18.9571 17.8413 18.8155 17.4479 18.5858 17.106C18.3562 16.7641 18.0456 16.4842 17.6817 16.2913C17.3178 16.0983 16.9119 15.9982 16.5 16H1.5M21.1625 5.66248C21.5261 5.29983 21.9734 5.03237 22.4649 4.88374C22.9564 4.73512 23.477 4.7099 23.9806 4.81034C24.4842 4.91077 24.9553 5.13375 25.3522 5.45956C25.7491 5.78538 26.0596 6.20398 26.2562 6.67834C26.4529 7.15271 26.5296 7.66822 26.4796 8.17929C26.4296 8.69035 26.2544 9.18122 25.9695 9.60847C25.6847 10.0357 25.2989 10.3862 24.8464 10.6289C24.3939 10.8716 23.8885 10.9991 23.375 11H1.5"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h5>
          </Tab>
        </div>
        <div className="d-flex">
          <p className="mb-0 mr-1 text-center min-w--100">Logo</p>
          <p className="mb-0 mr-2 text-center min-w--100">Tagline</p>
          <p className="mb-0 mr-1 text-center min-w--100">Button</p>
          <p className="mb-0 mr-2 text-center min-w--100">Animation</p>
        </div>
      </div>
    );
  };

  renderFontItems = () => {
    return (
      <div className="font-zone-wrapper w-50">
        <div className="d-flex w-100 font-zone">
          <Tab
            className="item font-tab text-center mr-2"
            selectedClassName="active-tab"
          >
            <h5 className="card-title mb-0">Aa</h5>
          </Tab>
          <Tab
            className="item font-tab text-center mr-2"
            selectedClassName="active-tab"
          >
            <h5 className="card-title mb-0">Aa</h5>
          </Tab>
          <Tab
            className="item font-tab text-center mr-2"
            selectedClassName="active-tab"
          >
            <h5 className="card-title mb-0">Aa</h5>
          </Tab>
          <Tab
            className="item font-tab text-center mr-2"
            selectedClassName="active-tab"
          >
            <h5 className="card-title mb-0">Aa</h5>
          </Tab>
        </div>
        <div className="d-flex">
          <p className="mb-0 mr-1 text-center min-w--100">Classic</p>
          <p className="mb-0 mr-2 text-center min-w--100">Serif</p>
          <p className="mb-0 mr-1 text-center min-w--100">Round</p>
          <p className="mb-0 mr-2 text-center min-w--100">Modern</p>
        </div>
      </div>
    );
  };

  render() {
    const {
      contentState: { colorSelect = [], fontTab, highlightContentTab, industryValue, requirementText } = {},
    } = this.props;

    return (
      <div className="content mt-4 container">
        <div className="color-select form-group">
          <label className="mr-1">Which industry does your Product belong to?</label>
          <span style={{ color: 'red' }} className="mb-2">*</span>
          <Select
            value={industryValue}
            isSearchable={false}
            options={mockIndustry}
            className="product"
            classNamePrefix="react-select"
            onChange={(e) => this.props.handleContentState('industryValue', e)}
          />
        </div>
        <div className="color-select form-group">
          <label className="mr-1">
            Which of these colors do you feel best represents your Product?
          </label>
          <span style={{ color: 'red' }} className="mb-2">*</span>
          <Select
            closeMenuOnSelect={false}
            value={colorSelect}
            isMulti
            options={mockData}
            isSearchable={false}
            className="product"
            classNamePrefix="react-select"
            styles={colourStyles}
            onChange={this.handleColorSelect}
          />
        </div>

        <div className="form-group">
          <Tabs onSelect={this.handleFontTabs} selectedIndex={fontTab}>
            <div className="tablist-inner d-block">
              <TabList className="pv-tab-button">
                <label className="mr-1">Which font would you choose for your Product?</label>
                <span style={{ color: 'red' }} className="mb-2">*</span>
                {this.renderFontItems()}
              </TabList>
            </div>
          </Tabs>
        </div>
        <div className="form-group">
          <Tabs
            onSelect={this.handleHighlightContentTabs}
            selectedIndex={highlightContentTab}
          >
            <div className="tablist-inner d-block">
              <TabList className="pv-tab-button">
                <label className="mr-1">What's the highlight content of your Product?</label>
                <span style={{ color: 'red' }} className="mb-2">*</span>
                {this.renderHighlightItems()}
              </TabList>
            </div>
          </Tabs>
        </div>
        <div className="tablist-inner d-block form-group mb-0">
          <label className="ptb--10 mb-0 label">Detail Information</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Type your answer here.."
            value={requirementText}
            onChange={(e) => this.props.handleContentState('requirementText', e.target.value)}
          ></textarea>
          <div className="d-flex mt--10">
            <UploadFiles
              isMulti={true}
              handleFileUpload={this.props.handleFileUpload}
              handleAlert={this.props.handleAlert}
              fileUpload={this.props.fileUpload}
              onChange={this.props.onChangeFileInput}
              maxLength={5}
              className="pr-2"
            />
            {this.props.files.length > 0 && this.props.renderAttachments()}
          </div>
        </div>
        <div className="button-wrapper mt-2">
          <button
            className="btn btn-back mr-3 btn-lg"
            onClick={() => this.props.handleStep('prev', 2)}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}

export default Content;

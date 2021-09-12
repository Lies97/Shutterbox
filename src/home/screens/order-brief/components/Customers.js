import React, { Component } from 'react';
import Select from 'react-select';
import { Tab, Tabs, TabList } from 'react-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UploadFiles from '../../../components/UploadFiles';
import '../style.scss';

const mockData = {
  targetCustomers: [
    { value: 'from15To30', label: 'From 15 to 30' },
    { value: 'from30To45', label: 'From 30 to 45' },
    { value: 'olderThan45', label: 'Older than 45' },
  ],
  customerGenders: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'both', label: 'Both' },
  ],
};

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled1: this.props.customersState.customersIndustryTab !== 0,
      isDisabled2: this.props.customersState.customersIndustryTab !== 1,
      isDisabled3: this.props.customersState.customersIndustryTab !== 2,
      selectedIndex: 0,
      files: [],
      customersIndustry1: [
        { value: 'student', label: 'Student', isChecked: false },
        { value: 'officer', label: 'Officer', isChecked: false },
        { value: 'business', label: 'Business', isChecked: false },
      ],
      customersIndustry2: [
        { value: 'worker', label: 'Worker', isChecked: false },
        { value: 'retire', label: 'Retire', isChecked: false },
        { value: 'unemployment', label: 'Unemployment', isChecked: false },
      ],
      customersFav: [
        { value: 'music', label: 'Music', isChecked: false },
        { value: 'sport', label: 'Sport', isChecked: false },
        { value: 'game', label: 'Game', isChecked: false },
        { value: 'anime', label: 'Anime', isChecked: false },
        { value: 'hentai', label: 'Hentai', isChecked: false },
      ],
      customersFavOther: false,
    };
    this.input = {
      favorite: React.createRef(),
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

  handleSelectFormat = (key) => {
    const { selectedIndex } = this.state;
    const { handleCustomerState } = this.props;

    switch (key) {
      case 1:
        handleCustomerState('otherCustomersIndustry', '');
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
        handleCustomerState('otherCustomersIndustry', '');
        this.setState({
          isDisabled1: false,
          isDisabled2: true,
          isDisabled3: true,
        });
        break;
    }

    if (selectedIndex !== key) {
      this.props.handleClearIndustryCheckbox();
    }

    handleCustomerState('customersIndustryTab', key);

    this.setState({ selectedIndex: key });
  };

  renderCustomersIndustry = (industries, secondIndustry = false) => {
    return industries.map((industry, index) => {
      const { value, label, isChecked } = industry;
      return (
        <div
          className={`first-box d-inline-block position-relative ${
            index === 2 ? '' : 'mr-3 min-w--105'
          }`}
          key={index}
        >
          <input
            type="checkbox"
            id={`checkbox-${secondIndustry ? index + 3 : index}`}
            checked={isChecked}
            onChange={(e) => this.props.onChangeInput(e, secondIndustry)}
            value={value}
          />
          <label
            className="pl--20 mb-0 ml-1 mr-2 label"
            htmlFor={`checkbox-${secondIndustry ? index + 3 : index}`}
          >
            {label}
          </label>
        </div>
      );
    });
  };

  renderFavs = () => {
    const {
      handleCustomFavsCheckbox,
      customersState: { customersFav },
    } = this.props;

    return customersFav.map((industry, index) => {
      const { value, label, isChecked } = industry;
      return (
        <div className={`first-box position-relative`} key={index}>
          <input
            type="checkbox"
            id={`checkbox-${index + 6}`}
            checked={isChecked}
            value={value}
            onChange={handleCustomFavsCheckbox}
          />
          <label
            className="pl--20 mb-0 ml-1 mr-2 label"
            htmlFor={`checkbox-${index + 6}`}
          >
            {label}
          </label>
        </div>
      );
    });
  };

  handleTargetCustomers = (e) => {
    const { handleCustomerState } = this.props;
    handleCustomerState('targetCustomersSelect', e);
  };

  handleCustomersGender = (e) => {
    const { handleCustomerState } = this.props;
    handleCustomerState('customersGender', e);
  };

  getFavInput = () => {
    const {
      customersState: { customersFavOther, otherCustomerFavOther },
    } = this.props;
    if (!customersFavOther) {
      return '';
    } else {
      return otherCustomerFavOther;
    }
  };

  getIndustryInput = () => {
    const {
      customersState: { customersIndustryTab, otherCustomersIndustry },
    } = this.props;
    if (customersIndustryTab === 1 || customersIndustryTab === 0) {
      return '';
    } else {
      return otherCustomersIndustry;
    }
  };

  render() {
    const {
      isDisabled2,
      isDisabled3,
    } = this.state;
    const { targetCustomers, customerGenders } = mockData;
    const {
      handleCustomFavsCheckbox,
      customersState: {
        targetCustomersSelect,
        customersGender,
        customersIndustryTab,
        customersIndustry1,
        customersIndustry2,
        customersFavOther,
        requirementText,
      },
    } = this.props;

    return (
      <div className="product container mt-4">
        <div className="target-customers form-group">
          <label className="label mr-1">How old is your target Customers?</label>
          <span style={{ color: 'red' }} className="mb-2">*</span>
          <Select
            options={targetCustomers}
            className="product"
            classNamePrefix="react-select"
            isSearchable={false}
            value={targetCustomersSelect}
            onChange={this.handleTargetCustomers}
          ></Select>
        </div>
        <div className="customers-gender form-group">
          <label className="label mr-1">What are your customers?</label>
          <span style={{ color: 'red' }} className="mb-2">*</span>
          <Select
            options={customerGenders}
            className="product"
            classNamePrefix="react-select"
            isSearchable={false}
            value={customersGender}
            onChange={this.handleCustomersGender}
          ></Select>
        </div>
        <div className="customers-industry form-group">
          <label className="label">What are your Customer's industry?</label>
          <Tabs
            onSelect={this.handleSelectFormat}
            selectedIndex={customersIndustryTab}
          >
            <div className="tablist-inner d-block">
              <TabList className="pv-tab-button">
                <div className="d-flex w-100">
                  <div className="w-100">
                    <Tab
                      className="item mr-2 w--30 text-center d-inline-block mr-3"
                      selectedClassName="active-item"
                    >
                      No difference
                    </Tab>
                    <div className="d-inline-block w--67"></div>
                    <Tab
                      className="item mr-2 w--30 text-center mt-2 d-inline-block mr-3 mb-0"
                      selectedClassName="active-item"
                    >
                      Difference
                    </Tab>
                    <div
                      className={`d-inline-block w--67 ${
                        isDisabled2 ? 'disabled' : ''
                      }`}
                    >
                      {this.renderCustomersIndustry(customersIndustry1)}
                    </div>
                    <div className="mr-2 w--30 text-center my-2 d-inline-block mr-3"></div>
                    <div
                      className={`d-inline-block w--67 ${
                        isDisabled2 ? 'disabled' : ''
                      }`}
                    >
                      {this.renderCustomersIndustry(customersIndustry2, true)}
                    </div>
                    <Tab
                      className="item mr-2 w--30 text-center d-inline-block mr-3"
                      selectedClassName="active-item"
                    >
                      Other
                    </Tab>
                    <div
                      className={`d-inline-block w--67 ${
                        isDisabled3 ? 'disabled' : ''
                      }`}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type your answer here"
                        value={this.getIndustryInput()}
                        onChange={(e) =>
                          this.props.handleCustomerState(
                            'otherCustomersIndustry',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </TabList>
            </div>
          </Tabs>
        </div>
        <div className="customers-industry form-group">
          <label className="label">Your customers are delighted with</label>
          <div className="checkbox-wrapper">
            <div className="available-option d-flex justify-content-between">
              {this.renderFavs()}
            </div>
            <div className="other-option mt-2 d-flex align-items-center">
              <div className="first-box d-inline-block position-relative w--27">
                <input
                  type="checkbox"
                  id="11"
                  checked={customersFavOther}
                  value="other"
                  onChange={handleCustomFavsCheckbox}
                />
                <label className="pl--20 mb-0 ml-1 mr-2 label" htmlFor="11">
                  Other
                </label>
              </div>
              <input
                className={`form-control d-inline-block ${
                  customersFavOther ? '' : 'disabled'
                }`}
                value={this.getFavInput()}
                onChange={(e) =>
                  this.props.handleCustomerState(
                    'otherCustomerFavOther',
                    e.target.value
                  )
                }
                placeholder="Type your answer here"
              />
            </div>
          </div>
          <div className="tablist-inner d-block">
            <label className="ptb--10 mb-0 label">Detail Information</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Type your answer here.."
              value={requirementText}
              onChange={(e) => this.props.handleCustomerState('requirementText', e.target.value)}
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
          </div>
          <div className="button-wrapper mt-2">
            <button
              className="btn btn-back mr-3 btn-lg"
              onClick={() => this.props.handleStep('prev', 1)}
            >
              Back
            </button>
            <button
              className="btn btn-next btn-lg"
              onClick={() => this.props.handleStep('next', 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Customers;

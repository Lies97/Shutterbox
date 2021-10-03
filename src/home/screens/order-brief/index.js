import React, { Component } from 'react';
import PageHelmet from '../../../component/common/Helmet';
import Breadcrumb from '../../../elements/common/Breadcrumb';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from 'react-icons/fi';
import Header from '../../../component/header/Header';
import './style.scss';
import Footer from '../../../component/footer/FooterTwo';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import emailjs from 'emailjs-com';

import Loading from '../../../component/common/Loading';
import { fetchNews } from '../../../redux/actions/news/fetch-news'
import Animate from '@charlesvien/react-animatecss';
import Product from './components/Product';
import Content from './components/Content';
import Customers from './components/Customers';
import Summary from './components/Summary';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class OrderBrief extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      errorSubmit: '',
      totalAssets: 1,
      totalPoints: 100,
      contentState: {
        colorSelect: null,
        submitLoading: false,
        fontTab: 0,
        highlightContentTab: 0,
        requirementText: '',
        industryValue: '',
        fontSelect: [
          { label: 'Classic', value: 'classic' },
          { label: 'Serif', value: 'serif' },
          { label: 'Round', value: 'round' },
          { label: 'Modern', value: 'modern' },
        ],
        logoSelect: [
          { label: 'Logo', value: 'logo' },
          { label: 'Tagline', value: 'tagline' },
          { label: 'Button', value: 'button' },
          { label: 'Animation', value: 'animation' },
        ],
      },
      customersState: {
        targetCustomersSelect: null,
        customersGender: null,
        customersIndustryTab: 0,
        customersIndustry: null,
        customersFavorite: null,
        requirementText: '',
        otherCustomersIndustry: '',
        industryItem: null,
        favoriteItem: null,

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
        otherCustomerFavOther: '',
      },
      productState: {
        productName: '',
        selectedCard: 0,
        selectedType: 0,
        selectedFormat: 0,
        totalPoints: 100,
        requirementText: '',
        formatValue: '',
        quantity: 1,
        cardItem: [
          {
            label: 'UI/UX',
            value: 'ui-ux',
            type: [
              {
                label: 'Banner',
                value: 'banner',
                format: null,
                totalPoints: 100,
              },
              {
                label: 'Page event',
                value: 'page-event',
                totalPoints: 200,
                format: [
                  { label: 'Desktop', value: 'desktop' },
                  { label: 'Mobile', value: 'mobile' },
                ],
              },
              {
                label: 'New product',
                value: 'new-product',
                totalPoints: 1000,
                format: [
                  { label: 'Desktop', value: 'desktop' },
                  { label: 'Mobile', value: 'mobile' },
                ],
              },
            ],
          },
          {
            label: 'Marketing Ads',
            value: 'marketing-ads',
            type: [
              {
                label: 'Banner',
                value: 'banner',
                totalPoints: 50,
                format: [
                  { label: '1:1 (1080 x 1080)', value: '1-1-1080-1080' },
                  { label: '4:5 (1080 x 1350)', value: '4-5-1080-1350' },
                  { label: '16:9 (1920 x 1080)', value: '16-9-1920-1080' },
                ],
              },
              {
                label: 'Landing page',
                value: 'landing-page',
                totalPoints: 200,
                format: [
                  { label: 'Desktop', value: 'desktop' },
                  { label: 'Mobile', value: 'mobile' },
                  { label: 'Responsive', value: 'responsive' },
                ],
              },
              {
                label: 'TVC / Video',
                value: 'tvc-video',
                totalPoints: 500,
                format: [
                  { label: '1:1 (1080 x 1080)', value: '1-1-1080-1080' },
                  { label: '4:5 (1080 x 1350)', value: '4-5-1080-1350' },
                  { label: '16:9 (1920 x 1080)', value: '16-9-1920-1080' },
                ],
              },
              {
                label: 'CPD',
                value: 'cpd',
                totalPoints: 300,
                format: [
                  { label: 'Package', value: 'package' },
                  { label: 'Other', value: 'other' },
                ],
              },
            ],
          },
          {
            label: 'Art Work',
            value: 'art-work',
            type: [
              { label: 'Character', value: 'character', totalPoints: 50 },
              { label: 'Environment', value: 'environment', totalPoints: 100 },
              { label: 'Card game', value: 'card-game', totalPoints: 150 },
            ],
          },
        ],
        tvcVideoFormat: [
          {
            label: '1:1 (1080 x 1080)',
            checkboxes: [
              { id: 1, label: '15s', value: '15s', isChecked: false },
              { id: 2, label: '20s', value: '20s', isChecked: false },
              { id: 3, label: 'More than 60s', value: '60s', isChecked: false },
            ],
          },
          {
            label: '4:5 (1080 x 1350)',
            checkboxes: [
              { id: 4, label: '15s', value: '15s', isChecked: false },
              { id: 5, label: '20s', value: '20s', isChecked: false },
              { id: 6, label: 'More than 60s', value: '60s', isChecked: false },
            ],
          },
          {
            label: '16:9 (1920 x 1080)',
            checkboxes: [
              { id: 7, label: '15s', value: '15s', isChecked: false },
              { id: 8, label: '20s', value: '20s', isChecked: false },
              { id: 9, label: 'More than 60s', value: '60s', isChecked: false },
            ],
          },
        ],
      },

      requirementText: '',
      files: [],
    };
    this.formRef = React.createRef();
    this.fileUpload = React.createRef();
  }

  componentDidMount() {
    // this.props.fetchNews();
  }

  handleStep = (type, index) => {
    type === 'next' ? this.handleSelect(++index) : this.handleSelect(--index);
  };

  handleRequirementText = (requirementText) => {
    this.setState({ requirementText });
  };

  handleContentState = (key, value) => {
    const { contentState } = this.state;
    this.setState({
      contentState: {
        ...contentState,
        [key]: value,
      },
    });
  };

  handleCustomFavsCheckbox = (e) => {
    const {
      customersState: { customersFav },
    } = this.state;
    const value = e.target.value;
    let otherCheckbox = false;

    const resetCustomFavCheckboxes = customersFav.map((item) => {
      return { ...item, isChecked: false };
    });

    this.setState(
      {
        customersState: {
          ...this.state.customersState,
          customersFavOther: false,
          customersFav: resetCustomFavCheckboxes,
        },
      },
      () => {
        const { customersState } = this.state;
        const index = customersState.customersFav.findIndex(
          (data) => data.value === value
        );
        const cloneArray = customersState.customersFav;

        if (index >= 0) {
          cloneArray[index].isChecked = !cloneArray[index].isChecked;
        } else {
          otherCheckbox = !otherCheckbox;
        }

        this.setState({
          customersState: {
            ...this.state.customersState,
            customersFavOther: otherCheckbox,
            customersFav: cloneArray,
            favoriteItem: cloneArray[index],
          },
        });
      }
    );
  };

  handleCustomerState = (key, value, cb = () => {}) => {
    const { customersState } = this.state;
    this.setState(
      {
        customersState: {
          ...customersState,
          [key]: value,
        },
      },
      () => {
        cb();
      }
    );
  };

  handleProductState = (key, value, cb = () => {}) => {
    const { productState } = this.state;
    this.setState(
      {
        productState: {
          ...productState,
          [key]: value,
        },
      },
      () => {
        cb();
      }
    );
  };

  handleProductStateAsync = (key, value) => {
    const { productState } = this.state;
    this.setState({
      productState: {
        ...productState,
        [key]: value,
      },
    });
  };

  handleCustomIndustryCheckbox = (e, secondIndustry = false) => {
    const {
      customersState: { customersIndustry1, customersIndustry2 },
      customersState,
    } = this.state;
    const value = e.target.value;

    const resetCheckedBox1 = customersIndustry1.map((item) => {
      return { ...item, isChecked: false };
    });

    const resetCheckedBox2 = customersIndustry2.map((item) => {
      return { ...item, isChecked: false };
    });

    this.setState(
      {
        customersState: {
          ...customersState,
          customersIndustry1: resetCheckedBox1,
          customersIndustry2: resetCheckedBox2,
        },
      },
      () => {
        if (secondIndustry) {
          const index = this.state.customersState.customersIndustry2.findIndex(
            (data) => data.value === value
          );
          const cloneArray = this.state.customersState.customersIndustry2;
          if (index >= 0) {
            cloneArray[index].isChecked = !cloneArray[index].isChecked;
          }

          this.setState({
            customersState: {
              ...this.state.customersState,
              customersIndustry2: cloneArray,
              industryItem: cloneArray[index],
            },
          });
        } else {
          const index = this.state.customersState.customersIndustry1.findIndex(
            (data) => data.value === value
          );
          const cloneArray = this.state.customersState.customersIndustry1;
          if (index >= 0) {
            cloneArray[index].isChecked = !cloneArray[index].isChecked;
          }
          this.setState({
            customersState: {
              ...this.state.customersState,
              customersIndustry1: cloneArray,
              industryItem: cloneArray[index],
            },
          });
        }
      }
    );
  };

  handleClearIndustryCheckbox = () => {
    const {
      customersState: { customersIndustry1, customersIndustry2 },
    } = this.state;
    customersIndustry1.forEach((item) => {
      item.isChecked = false;
    });

    customersIndustry2.forEach((item) => {
      item.isChecked = false;
    });

    this.setState({
      customersState: {
        ...this.state.customersState,
        customersIndustry1,
        customersIndustry2,
      },
    });
  };

  handleCustomProductCheckbox = (e) => {
    const {
      productState: { tvcVideoFormat },
      productState,
    } = this.state;
    const id = e.target.id;

    const resetCheckedBox = tvcVideoFormat.map((item) => {
      const checkboxes = item.checkboxes.map((nestedItem) => {
        return { ...nestedItem, isChecked: false };
      });
      return { ...item, checkboxes };
    });

    this.setState(
      {
        productState: {
          ...productState,
          tvcVideoFormat: resetCheckedBox,
        },
      },
      () => {
        const {
          productState: { tvcVideoFormat: newTvcVideoFormat },
        } = this.state;
        const tempArray = newTvcVideoFormat.map((item) => {
          const index = item.checkboxes.findIndex((data) => data.id == id);

          const cloneArray = item.checkboxes;
          if (index >= 0) {
            cloneArray[index].isChecked = !cloneArray[index].isChecked;
          }
          return { ...item, checkboxes: cloneArray };
        });

        this.setState({
          productState: {
            ...this.state.productState,
            tvcVideoFormat: tempArray,
          },
        });
      }
    );
  };

  handleClearProductCheckbox = () => {
    const {
      productState: { tvcVideoFormat },
    } = this.state;
    tvcVideoFormat.forEach((item) => {
      item.checkboxes.forEach((nestedItem) => {
        nestedItem.isChecked = false;
      });
    });

    this.setState({
      productState: {
        ...this.state.productState,
        tvcVideoFormat,
      },
    });
  };

  handleSelect = (key) => {
    this.setState({ selectedIndex: key });
  };

  renderTabItems = () => {
    return (
      <div className="d-flex">
        <Tab>
          <span>Product</span>
        </Tab>
        <Tab>
          <span>Customers</span>
        </Tab>
        <Tab>
          <span>Content</span>
        </Tab>
      </div>
    );
  };

  renderTabPanel = (tabName) => {
    const { isLoading } = this.props;
    const { contentState, customersState, productState, files } = this.state;

    return isLoading ? (
      <TabPanel></TabPanel>
    ) : (
      <div>
        <Animate
          animationIn="fadeInUp"
          animationOut="fadeOut"
          inDuration={1000}
          outDuration={1000}
          visible
          repeat={1}
        >
          <TabPanel>
            {tabName === 'product' && (
              <Product
                handleStep={this.handleStep}
                productState={productState}
                handleProductState={this.handleProductState}
                handleProductStateAsync={this.handleProductStateAsync}
                onChangeInput={this.handleCustomProductCheckbox}
                onClearInput={this.handleClearProductCheckbox}
                handleFileUpload={this.handleFileUpload}
                renderAttachments={this.renderAttachments}
                handleDeleteFile={this.handleDeleteFile}
                handleRequirementText={this.handleRequirementText}
                files={files}
                handleAlert={this.handleAlert}
                requirementText={this.state.requirementText}
                onChangeFileInput={this.onChangeFileInput}
                fileUpload={this.fileUpload}
              />
            )}
            {tabName === 'customers' && (
              <Customers
                handleStep={this.handleStep}
                customersState={customersState}
                handleCustomerState={this.handleCustomerState}
                onChangeInput={this.handleCustomIndustryCheckbox}
                handleClearIndustryCheckbox={this.handleClearIndustryCheckbox}
                handleCustomFavsCheckbox={this.handleCustomFavsCheckbox}
                handleFileUpload={this.handleFileUpload}
                renderAttachments={this.renderAttachments}
                handleDeleteFile={this.handleDeleteFile}
                handleRequirementText={this.handleRequirementText}
                files={files}
                handleAlert={this.handleAlert}
                requirementText={this.state.requirementText}
                onChangeFileInput={this.onChangeFileInput}
                fileUpload={this.fileUpload}
              />
            )}
            {tabName === 'content' && (
              <Content
                contentState={contentState}
                handleContentState={this.handleContentState}
                handleStep={this.handleStep}
                handleFileUpload={this.handleFileUpload}
                renderAttachments={this.renderAttachments}
                handleDeleteFile={this.handleDeleteFile}
                handleRequirementText={this.handleRequirementText}
                files={files}
                handleAlert={this.handleAlert}
                requirementText={this.state.requirementText}
                onChangeFileInput={this.onChangeFileInput}
                fileUpload={this.fileUpload}
              />
            )}
          </TabPanel>
        </Animate>
      </div>
    );
  };

  handleFileUpload = (files, cb = () => {}) => {
    let filesArray = [];
    for (var key in files) {
      if (files.hasOwnProperty(key)) {
        filesArray = filesArray.concat(files[key]);
      }
    }

    this.setState({ files: filesArray, formFiles: files }, () => {
      cb();
    });
  };

  handleDeleteFile = (file) => {
    const { files } = this.state;
    const filteredFiles = files.filter((f) => f.name !== file.name);
    this.setState({ files: filteredFiles });
  };

  renderAttachments = () => {
    const { files } = this.state;
    if (files.length <= 1) {
      return files.map((file) => (
        <div className="d-flex align-items-center pr-2 attachment-zone w--75">
          <FontAwesomeIcon icon={['fa', 'paperclip']} size="xs" />
          <label className="d-inline-block pl-2 mb-0 truncate">
            {file.name}
          </label>
          <div
            className="delete-wrapper pl-1"
            onClick={() => this.handleDeleteFile(file)}
          >
            <FontAwesomeIcon icon={['fas', 'times']} size="xs" />
          </div>
        </div>
      ));
    } else {
      return (
        <div className="d-flex align-items-center pr-2 attachment-zone">
          <label className="mb-0">You have uploaded {files.length} files</label>
        </div>
      );
    }
  };

  getCheckboxValue = (prefix) => {
    const {
      productState: { tvcVideoFormat, selectedFormat },
    } = this.state;
    const label = tvcVideoFormat[selectedFormat].checkboxes.find(
      (data) => data.isChecked
    )
      ? tvcVideoFormat[selectedFormat].checkboxes.find((data) => data.isChecked)
          .label
      : '';
    return label ? `${prefix} - ${label}` : prefix;
  };

  getFormatValue = () => {
    const { productState } = this.state;

    if (
      productState.cardItem[productState.selectedCard].type[
        productState.selectedType
      ]
    ) {
      if (
        productState.cardItem[productState.selectedCard].type[
          productState.selectedType
        ].format &&
        (productState.selectedCard != 1 || productState.selectedType != 2)
      ) {
        const value =
          productState.cardItem[productState.selectedCard].type[
            productState.selectedType
          ].format[productState.selectedFormat];

        return value
          ? productState.cardItem[productState.selectedCard].type[
              productState.selectedType
            ].format[productState.selectedFormat].label
          : '';
      } else if (
        productState.cardItem[productState.selectedCard].type[
          productState.selectedType
        ].format &&
        productState.selectedCard == 1 &&
        productState.selectedType == 2
      ) {
        const value =
          productState.cardItem[productState.selectedCard].type[
            productState.selectedType
          ].format[productState.selectedFormat];
        return this.getCheckboxValue(
          productState.cardItem[productState.selectedCard].type[
            productState.selectedType
          ].format[productState.selectedFormat].label
        );
      }
    } else {
      return '';
    }
  };

  getColorValue = () => {
    const {
      contentState: { colorSelect },
    } = this.state;
    if (colorSelect) {
      let color = '';
      colorSelect.forEach((data) => {
        color += color ? ` - ${data.label}` : data.label;
      });
      return color;
    }
  };

  handleSubmit = () => {
    const { contentState, productState, customersState, totalAssets } =
      this.state;

    let validationErr = '';

    const preparedData = {
      productName: productState.productName,
      productType: productState.cardItem[productState.selectedCard].label,
      productFormat: this.getFormatValue() || '',
      productSpecificRequirement: productState.requirementText,

      customersTarget: customersState.targetCustomersSelect
        ? customersState.targetCustomersSelect.label
        : '',
      customersGender: customersState.customersGender
        ? customersState.customersGender.label
        : '',
      customersIndustry: customersState.industryItem
        ? customersState.industryItem.label
        : customersState.otherCustomersIndustry,
      customersFavorite: customersState.favoriteItem
        ? customersState.favoriteItem.label
        : customersState.otherCustomerFavOther,
      customersDetailInformation: customersState.requirementText,

      productIndustry: contentState.industryValue
        ? contentState.industryValue.label
        : '',
      productColors: contentState.colorSelect ? this.getColorValue() : '',
      productFont: contentState.fontSelect[contentState.fontTab].label,
      productHighlightContent:
        contentState.logoSelect[contentState.highlightContentTab].label,
      contentDetailInformation: contentState.requirementText,

      totalAssets: this.state.productState.quantity,
      quantity: this.state.productState.quantity,
      totalPoints: this.state.quantity
        ? this.state.productState.totalPoints * this.state.quantity
        : this.state.productState.totalPoints,
    };

    const finalData = {
      productName: { label: 'Product Name', data: preparedData.productName },
      productType: { label: 'Product Type', data: preparedData.productType },
      productFormat: {
        label: 'Product Format',
        data: preparedData.productFormat,
      },
      productSpecificRequirement: {
        label: 'Product Specific Requirement',
        data: preparedData.productSpecificRequirement,
      },

      customersTarget: {
        label: 'Customers Target',
        data: preparedData.customersTarget,
      },
      customersGender: {
        label: 'Customers Gender',
        data: preparedData.customersGender,
      },
      customersIndustry: {
        label: 'Customers Industry',
        data: preparedData.customersIndustry,
      },
      customersFavorite: {
        label: 'Customers Favorite',
        data: preparedData.customersFavorite,
      },
      customersDetailInformation: {
        label: 'Customers Details Information',
        data: preparedData.customersDetailInformation,
      },

      productIndustry: {
        label: 'Product Industry',
        data: preparedData.productIndustry,
      },
      productColors: {
        label: 'Product Colors',
        data: preparedData.productColors,
      },
      productFont: { label: 'Product Font', data: preparedData.productFont },
      productHighlightContent: {
        label: 'Product Highlight Content',
        data: preparedData.productHighlightContent,
      },
      contentDetailInformation: {
        label: 'Content Detail Information',
        data: preparedData.contentDetailInformation,
      },

      totalAssets: { label: 'Total Assets', data: preparedData.quantity },
      quantity: { label: 'Quantity', data: preparedData.quantity },
      totalPoints: { label: 'Total Points', data: preparedData.totalPoints },
    };

    if (!finalData.productName.data) {
      validationErr += validationErr
        ? `, ${finalData.productName.label}`
        : finalData.productName.label;
    }

    if (!finalData.customersTarget.data) {
      validationErr += validationErr
        ? `, ${finalData.customersTarget.label}`
        : finalData.customersTarget.label;
    }

    if (!finalData.customersGender.data) {
      validationErr += validationErr
        ? `, ${finalData.customersGender.label}`
        : finalData.customersGender.label;
    }

    if (!finalData.productIndustry.data) {
      validationErr += validationErr
        ? `, ${finalData.productIndustry.label}`
        : finalData.productIndustry.label;
    }

    if (!finalData.productColors.data) {
      validationErr += validationErr
        ? `, ${finalData.productIndustry.label}`
        : finalData.productIndustry.label;
    }

    if (!finalData.quantity.data || finalData.quantity.data == 0) {
      validationErr += validationErr
        ? `, ${finalData.quantity.label}`
        : finalData.quantity.label;
    }

    this.setState({ errorSubmit: validationErr });

    if (!validationErr) {
      this.setState({ submitLoading: true });
      this.setState({ finalData }, () => {
        this.formRef.current.dispatchEvent(new Event("submit"));
      });
    }
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const service_id = 'service_j3zundm';
    // const service_id = 'default_service';
    const template_id = 'template_makj8po';
    const user_id = 'user_TaZERBEN3bIrgckYTj9ZY';

    emailjs
      .sendForm(service_id, template_id, e.target, user_id)
      .then((resp) => {
        this.setState({ submitLoading: false });
        this.handleAlert(`You've sent successfully your order!`, false);
      })
      .catch((err) => {
        this.setState({ submitLoading: false });
      });
  };

  renderForm = () => {
    const { finalData, formFiles } = this.state;

    return (
      <form
        className="contact-form d-none"
        onSubmit={this.handleFormSubmit}
        ref={this.formRef}
      >
        <input
          type="text"
          name="product_industry"
          value={!_.isEmpty(finalData) ? finalData.productIndustry.data : ''}
        />
        <input
          type="text"
          name="product_name"
          value={!_.isEmpty(finalData) ? finalData.productName.data : ''}
        />
        <input
          type="text"
          name="product_type"
          value={!_.isEmpty(finalData) ? finalData.productType.data : ''}
        />
        <input
          type="text"
          name="product_format"
          value={!_.isEmpty(finalData) ? finalData.productFormat.data : ''}
        />
        <input
          type="text"
          name="product_colors"
          value={!_.isEmpty(finalData) ? finalData.productColors.data : ''}
        />
        <input
          type="text"
          name="product_font"
          value={!_.isEmpty(finalData) ? finalData.productFont.data : ''}
        />
        <input
          type="text"
          name="product_highlight_content"
          value={
            !_.isEmpty(finalData) ? finalData.productHighlightContent.data : ''
          }
        />
        <input
          type="text"
          name="product_specific_requirement"
          value={
            !_.isEmpty(finalData)
              ? finalData.productSpecificRequirement.data
              : ''
          }
        />
        <input
          type="text"
          name="customer_target"
          value={!_.isEmpty(finalData) ? finalData.customersTarget.data : ''}
        />
        <input
          type="text"
          name="customer_gender"
          value={!_.isEmpty(finalData) ? finalData.customersGender.data : ''}
        />
        <input
          type="text"
          name="customer_favorite"
          value={!_.isEmpty(finalData) ? finalData.customersFavorite.data : ''}
        />
        <input
          type="text"
          name="customer_industry"
          value={!_.isEmpty(finalData) ? finalData.customersIndustry.data : ''}
        />
        <input
          type="text"
          name="customer_detail_information"
          value={
            !_.isEmpty(finalData)
              ? finalData.customersDetailInformation.data
              : ''
          }
        />
        <input
          type="text"
          name="content_detail_information"
          value={
            !_.isEmpty(finalData) ? finalData.contentDetailInformation.data : ''
          }
        />
        <input
          type="text"
          name="total_assets"
          value={!_.isEmpty(finalData) ? finalData.totalAssets.data : ''}
        />
        <input
          type="text"
          name="total_points"
          value={!_.isEmpty(finalData) ? (finalData.totalPoints.data * finalData.totalAssets.data) : ''}
        />
        <input
          type="file"
          name="{{my_file}}"
          id="{{my_file}}"
          accept="image/*, .pdf, .zip, .rar"
          ref={this.fileUpload}
          onChange={this.onChangeFileInput}
        />
      </form>
    );
  };

  onChangeFileInput = (e) => {
    const maxLength = 5;

    const files = Array.from(e.target.files);
    const convertByteToMb = (1024 * 1024).toFixed(2);

    const isExist =
      files.findIndex((file) => file.size / convertByteToMb > 1) >= 0;

    if (files.length > maxLength) {
      e.preventDefault();
      this.handleAlert(`Cannot upload files more than ${maxLength}`);
      this.handleFileUpload([]);
      return;
    }

    if (isExist) {
      e.preventDefault();
      if (files.length === 1) {
        this.handleAlert('Your file is bigger than 1MB');
        this.handleFileUpload([]);
      } else if (files.length > 1) {
        this.handleAlert('One of your files is bigger than 1MB');
        this.handleFileUpload([]);
      }
      return;
    }

    this.handleFileUpload(e.target.files);
  };

  handleAlert = (content, isError = true) => {
    isError
      ? toast.error(content)
      : toast.success(content, { theme: 'colored' });
  };

  render() {
    const {
      selectedIndex,
      productState,
      contentState,
      customersState,
      submitLoading,
      errorSubmit,
    } = this.state;
    const { isLoading } = this.props;
    return (
      <div className="wrapper">
        <PageHelmet pageTitle="Order Brief" />

        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />

        <Breadcrumb title={'Order Brief'} />

        <main className="page-wrapper">
          {/* Start Portfolio Area  */}
          <div
            className={`creative-portfolio-wrapper position-relative ptb--${
              isLoading ? 180 : 120
            } bg_color--1 order-brief-container ${
              submitLoading ? 'disabled' : ''
            }`}
          >
            {submitLoading && <Loading className="center-loading" />}
            {isLoading && <Loading />}

            {!isLoading && (
              <div>
                <div className="container order-brief p--35">
                  <Animate
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    inDuration={1000}
                    outDuration={1000}
                    visible
                    repeat={1}
                  >
                    <div>
                      <div className="row">
                        <div className="brief-header col-7 mr--50">
                          <Tabs
                            onSelect={this.handleSelect}
                            selectedIndex={selectedIndex}
                          >
                            <div className="row text-center">
                              <div className="col-lg-12">
                                <div className="tablist-inner">
                                  <TabList className="pv-tab-button text-center mt--30">
                                    {this.renderTabItems()}
                                  </TabList>
                                </div>
                              </div>
                            </div>
                            {this.renderTabPanel('product')}
                            {this.renderTabPanel('customers')}
                            {this.renderTabPanel('content')}
                          </Tabs>
                        </div>
                        <div className="summary-card col-4">
                          <Summary
                            productState={productState}
                            contentState={contentState}
                            customersState={customersState}
                            handleProductState={this.handleProductState}
                            requirementText={this.state.requirementText}
                          />
                        </div>
                      </div>
                    </div>
                  </Animate>
                </div>
                <div className="container w-100 mt-4 text-center">
                  <div className="">
                    <button
                      className="btn btn-next btn-lg"
                      onClick={this.handleSubmit}
                    >
                      SUBMIT ORDER
                    </button>
                  </div>
                  <div className="error-submit w--100 min-h--30">
                    <small className="text-danger mb-0">
                      {errorSubmit
                        ? `Please fill up the required information: `
                        : ''}
                      <small className="text-danger mb-0 font-weight-bold">
                        {errorSubmit}
                      </small>
                    </small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <div className="backto-top">
          <ScrollToTop showUnder={160}>
            <FiChevronUp />
          </ScrollToTop>
        </div>

        {this.renderForm()}
        <ToastContainer
          position="bottom-center"
          theme="dark"
          style={{ width: '400px' }}
        />

        <Footer isLoading={isLoading} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.homeReducer.isLoading,
    news: state.newsReducer.news,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNews: () => dispatch(fetchNews()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBrief);

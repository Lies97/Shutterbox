import React, { Component } from 'react';

class Summary extends Component {
  constructor(props) {
    super(props);
  }

  getCheckboxValue = (prefix) => {
    const {
      productState: { tvcVideoFormat, selectedFormat },
    } = this.props;
    const label = tvcVideoFormat[selectedFormat].checkboxes.find(
      (data) => data.isChecked
    )
      ? tvcVideoFormat[selectedFormat].checkboxes.find((data) => data.isChecked)
          .label
      : '';
    return label ? `${prefix} - ${label}` : prefix;
  };

  getFormatValue = () => {
    const { productState } = this.props;

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
        return productState.cardItem[productState.selectedCard].type[
          productState.selectedType
        ].format[productState.selectedFormat]
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

  renderProductSection = () => {
    const { productState } = this.props;
    return (
      <div className="body product-body pb-2">
        <div className="title-wrapper">
          <span className="d-inline-block plr--15 my-3">Product</span>
        </div>
        <div className="product-body">
          <div className="row">
            <div className="col-6 font-weight-bold">Name</div>
            <div className="col-6 font-weight-bold">Kind</div>
          </div>
          <div className="row">
            <div className="col-6 min-h--30">{productState.productName}</div>
            <div className="col-6 min-h--30">
              {productState.cardItem[productState.selectedCard].label} - {''}
              {productState.cardItem[productState.selectedCard].type[
                productState.selectedType
              ]
                ? productState.cardItem[productState.selectedCard].type[
                    productState.selectedType
                  ].label
                : ''}
            </div>
          </div>
          <div className="row">
            <div className="col-6 font-weight-bold">Format</div>
          </div>
          <div className="row">
            <div className="col-12 min-h--30">{this.getFormatValue()}</div>
          </div>
          <div className="row">
            <div className="col-7 font-weight-bold">Specific Requirement</div>
            <div className="col-12 min-h--30">
              <p className="mb-0 truncate">{productState.requirementText}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  getCustomerTargetValue = () => {
    const {
      customersState,
      customersState: {
        customersIndustryTab,
        industryItem,
        otherCustomersIndustry,
      },
    } = this.props;
    let returnedValue = '';

    if (customersState.targetCustomersSelect) {
      returnedValue += customersState.targetCustomersSelect.label;
      if (customersState.customersGender) {
        returnedValue += ` - ${customersState.customersGender.label}`;
      }

      if (customersIndustryTab === 0) {
        returnedValue += '';
      } else if (customersIndustryTab === 1) {
        returnedValue += industryItem ? ` - ${industryItem.label} ` : '';
      } else {
        returnedValue += ` - ${otherCustomersIndustry}`;
      }
    }

    return returnedValue;
  };

  getDelightedWithValue = () => {
    const {
      customersState: {
        favoriteItem,
        customersFavOther,
        otherCustomerFavOther,
      },
    } = this.props;

    let delightedWithValue = '';

    if (customersFavOther) {
      delightedWithValue = otherCustomerFavOther;
    } else if (!customersFavOther && favoriteItem) {
      delightedWithValue = favoriteItem.label;
    }

    return delightedWithValue;
  };

  renderCustomerSection = () => {
    const { customersState } = this.props;
    return (
      <div className="body product-body pb-2">
        <div className="title-wrapper">
          <span className="d-inline-block plr--15 my-3">Customer</span>
        </div>
        <div className="product-body">
          <div className="row">
            <div className="col-12 font-weight-bold">Target Customers</div>
          </div>
          <div className="row">
            <div className="col-12 min-h--30">
              <p className="mb-0 truncate">{this.getCustomerTargetValue()}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 font-weight-bold">They delighted With</div>
          </div>
          <div className="row min-h--30">
            <div className="col-12 min-h--30">
              <p className="mb-0 truncate">{this.getDelightedWithValue()}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 font-weight-bold">Detail Information</div>
            <div className="col-12 min-h--30">
              <p className="mb-0 truncate">{customersState.requirementText}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  getColorValue = (colorSelect) => {
    if (colorSelect) {
      let color = '';
      colorSelect.forEach((data) => {
        color += color ? ` - ${data.label}` : data.label;
      });
      return color;
    }
  };

  renderContentSection = () => {
    const { contentState } = this.props;

    return (
      <div className="body product-body pb-2">
        <div className="title-wrapper">
          <span className="d-inline-block plr--15 my-3">Content</span>
        </div>
        <div className="product-body">
          <div className="row">
            <div className="col-6 font-weight-bold">Industry</div>
            <div className="col-6 font-weight-bold">Color</div>
          </div>
          <div className="row">
            <div className="col-6 min-h--30">
              <p className="mb-0 truncate">
                {contentState.industryValue
                  ? contentState.industryValue.label
                  : ''}
              </p>
            </div>
            <div className="col-6 min-h--30">
              <p className="mb-0 truncate">
                {this.getColorValue(contentState.colorSelect)}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-6 font-weight-bold">Font</div>
            <div className="col-6 font-weight-bold">Priority</div>
          </div>
          <div className="row">
            <div className="col-6 min-h--30">
              <p className="mb-0 truncate">
                {contentState.fontSelect[contentState.fontTab].label}
              </p>
            </div>
            <div className="col-6 min-h--30">
              <p className="mb-0 truncate">
                {
                  contentState.logoSelect[contentState.highlightContentTab]
                    .label
                }
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-12 font-weight-bold">Detail Information</div>
            <div className="col-12 min-h--30">
              <p className="mb-0 truncate">{contentState.requirementText}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderTotalAsset = (quantity) => {
    if (!quantity || quantity < 1) {
      return `00`;
    } else if (quantity && quantity < 10) {
      return `0${quantity}`;
    } else if (quantity >= 10) {
      return quantity;
    }
  };

  renderTotal = () => {
    const {
      productState: { totalPoints, quantity },
    } = this.props;

    return (
      <div className="total-wrapper">
        <div className="row pb-3 total-number">
          <label className="col-10">Total number of assets</label>
          <label className="col-2">{this.renderTotalAsset(quantity)}</label>
        </div>
        <div className="row pt-3">
          <label className="col-10">Total Points</label>
          <label className="col-2">
            {!quantity || quantity < 1 ? `00` : totalPoints * quantity}
          </label>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="summary">
        <div className="title w-100">Summary</div>
        {this.renderProductSection()}
        {this.renderCustomerSection()}
        {this.renderContentSection()}
        {this.renderTotal()}
      </div>
    );
  }
}

export default Summary;

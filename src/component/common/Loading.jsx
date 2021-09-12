import React, { Component } from 'react';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className = '' } = this.props;
    return (
      <div className={`d-flex justify-content-center ${className}`}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Loading;

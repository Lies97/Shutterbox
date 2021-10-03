import React, { Component } from 'react';

class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
  }

  onChange = (e) => {
    const { maxLength, handleFileUpload, handleAlert } = this.props;

    const files = Array.from(e.target.files);
    const convertByteToMb = (1024*1024).toFixed(2);

    const isExist = files.findIndex(file => file.size / convertByteToMb > 0.49) >= 0;
    
    if (files.length > maxLength) {
      e.preventDefault();
      handleAlert(`Cannot upload files more than ${maxLength}`);
      handleFileUpload([]);
      return;
    }

    if (isExist) {
      e.preventDefault();
      if (files.length === 1) {
        handleAlert('Your file is bigger than 1MB');
        handleFileUpload([]);
      } else if (files.length > 1) {
        handleAlert('One of your files is bigger than 1MB');
        handleFileUpload([])
      }
      return;
    }
    
    handleFileUpload(e.target.files);
  };

  handleClickFile = () => {
    this.props.fileUpload.current.click();
  }

  render() {
    const { isMulti, className = '' } = this.props;
    return (
      <div className={className}>
        <input
          ref={this.fileUpload}
          onChange={this.props.onChange}
          type="file"
          style={{ display: 'none' }}
          multiple={isMulti}
        />
        <button
          className="btn btn-upload"
          onClick={this.handleClickFile}
        >
          Upload File
        </button>
      </div>
    );
  }
}

export default UploadFiles;

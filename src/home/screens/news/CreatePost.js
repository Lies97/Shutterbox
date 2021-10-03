import React, { Component } from 'react';
import { CreatePostSchema } from '../../../component/common/CreatePostSchema';
import { Formik, Form, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Animate from '@charlesvien/react-animatecss';
import PageHelmet from '../../../component/common/Helmet';
import Breadcrumb from '../../../elements/common/Breadcrumb';
import Header from '../../../component/header/Header';
import Footer from '../../../component/footer/FooterTwo';
import Loading from '../../../component/common/Loading';
import { connect } from 'react-redux';
import { createNews } from '../../../redux/actions/news/create-news';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from 'react-icons/fi';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';

const category = [
  { label: 'Digital Marketting', value: 'digital-marketting' },
  { label: 'Trending Technology', value: 'trending-technology' },
  { label: 'Machine AI', value: 'machine-ai' },
];

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [{}],
    };
    this.fileInput = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    const { createNewsData: nextCreateNewsData, createNewsError: nextCreateNewsError } = nextProps;
    const { createNewsData, createNewsError } = this.props;

    if (nextCreateNewsData && createNewsData !== nextCreateNewsData) {
      this.handleAlert('Created Post Successfully!', false);
      this.props.history.push('/news');
    } else if (nextCreateNewsError && createNewsError !== nextCreateNewsError) {
      this.handleAlert(nextCreateNewsError);
    }
  }

  handleClickFile = () => {
    this.fileInput.current.click();
  };

  handleSubmit = (values) => {
    const { createNews } = this.props;

    values.section = JSON.stringify(values.section);

    const formData = new FormData();
    Object.keys(values).map((key) => {
      formData.append(key, values[key]);
    });

    // console.log(values);
    createNews(formData);
  };

  handleAlert = (content, isError = true) => {
    isError
      ? toast.error(content, { autoClose: false })
      : toast.success(content, { theme: 'colored' });
  };

  handleDeleteFile = (file, setFieldValue) => {
    // const { files } = this.state;
    // const filteredFiles = files.filter((f) => f.name !== file.name);
    setFieldValue('file', null);
  };

  renderAttachments = (files, setFieldValue) => {
    if (files) {
      return (
        <div className="d-flex align-items-center px-2 attachment-zone w--75">
          <FontAwesomeIcon icon={['fa', 'paperclip']} size="xs" />
          <label className="d-inline-block pl-2 mb-0 truncate max-w--300">
            {files.name}
          </label>
          <div
            className="delete-wrapper pl-1"
            onClick={() => this.handleDeleteFile(files, setFieldValue)}
          >
            <FontAwesomeIcon icon={['fas', 'times']} size="xs" />
          </div>
        </div>
      );
    }
    //  else {
    //   return (
    //     <div className="d-flex align-items-center pr-2 attachment-zone">
    //       <label className="mb-0">You have uploaded {files.length} files</label>
    //     </div>
    //   );
    // }
  };

  renderSectionField = (section, index, setFieldValue) => {
    let temp = JSON.parse(JSON.stringify(index));

    return (
      <div className="section-wrapper form-group">
        <label>
          <span>Title ({++temp})</span>
          <span className="text-danger"> *</span>
        </label>{' '}
        <Field
          name={`section-label-${index}`}
          type="text"
          className="form-control"
          onChange={(e) => {
            setFieldValue(`section[${index}].label`, e.target.value);
          }}
        />
        <label>
          <span>Content ({temp})</span>
          <span className="text-danger"> *</span>
        </label>{' '}
        <Field
          name={`section-content-${index}`}
          as="textarea"
          rows="4"
          className="form-control"
          onChange={(e) => {
            setFieldValue(`section[${index}].content`, e.target.value);
          }}
        />
      </div>
    );
  };

  render() {
    const { sections } = this.state;
    const { isLoading } = this.props;

    return (
      <div>
        <PageHelmet pageTitle="News" />

        {/* Start Header Area  */}
        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />
        {/* End Header Area  */}

        {/* Start Breadcrump Area */}
        <Breadcrumb title={'News'} />
        {/* End Breadcrump Area */}
        <main className="page-wrapper">
          <div className="creative-portfolio-wrapper ptb--120 create-post-wrapper register-container">
            <Animate
              animationIn="fadeInUp"
              animationOut="fadeOut"
              inDuration={1000}
              outDuration={1000}
              visible
              repeat={1}
            >
              <div className={`form-group container p--35 container p--35 bg-white screen-sm position-relative ${isLoading ? 'disabled' : ''}` }>
                {isLoading && <Loading className="center-loading" />}
                <div className="title text-center">
                  <h3 className="active">Create Post</h3>
                </div>
                <Formik
                  initialValues={{
                    category: category[0].value,
                    title: '',
                    description: '',
                    author: '',
                    section: [],
                    file: null,
                  }}
                  onSubmit={(values) => {
                    this.handleSubmit(values);
                  }}
                  validationSchema={CreatePostSchema}
                >
                  {({ errors, touched, setFieldValue, values }) => (
                    <Form>
                      <div className="form-group">
                        <label>
                          <span>Category</span>
                          <span className="text-danger"> *</span>
                        </label>{' '}
                        <Select
                          name="category"
                          isSearchable={false}
                          options={category}
                          className="product"
                          classNamePrefix="react-select"
                          onChange={(e) => {
                            setFieldValue('category', e.value);
                          }}
                          defaultValue={category[0]}
                        />
                        {errors.category && touched.category ? (
                          <small className="text-danger">
                            {errors.category}
                          </small>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>
                          <span>Title</span>
                          <span className="text-danger"> *</span>
                        </label>{' '}
                        <Field
                          name="title"
                          type="text"
                          className="form-control"
                        />
                        {errors.title && touched.title ? (
                          <small className="text-danger">{errors.title}</small>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>
                          <span>Description</span>
                          <span className="text-danger"> *</span>
                        </label>{' '}
                        <Field
                          name="description"
                          type="text"
                          className="form-control"
                          as="textarea"
                          rows="4"
                        />
                        {errors.description && touched.description ? (
                          <small className="text-danger">
                            {errors.description}
                          </small>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>
                          <span>Section</span>
                          <span className="text-danger"> *</span>
                        </label>{' '}
                        <div className="plr--50">
                          {sections.map((section, index) => {
                            return this.renderSectionField(section, index, setFieldValue);
                          })}
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-next"
                              type="button"
                              onClick={() => {
                                this.setState({
                                  sections: this.state.sections.concat({}),
                                });
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>
                          <span>Author</span>
                          <span className="text-danger"> *</span>
                        </label>{' '}
                        <Field
                          name="author"
                          type="text"
                          className="form-control"
                        />
                        {errors.author && touched.author ? (
                          <small className="text-danger">{errors.author}</small>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>
                          <span>Image Detail</span>
                          <span className="text-danger"> *</span>
                        </label>{' '}
                        <div className="pr-2 d-flex">
                          <input
                            ref={this.fileInput}
                            onChange={(event) => {
                              setFieldValue('file', event.target.files[0]);
                            }}
                            name="file"
                            type="file"
                            style={{ display: 'none' }}
                            accept="image/*"
                          />
                          <button
                            className="btn btn-upload"
                            onClick={this.handleClickFile}
                            type="button"
                          >
                            Upload File
                          </button>
                          {values.file instanceof File && this.renderAttachments(values.file, setFieldValue)}
                        </div>
                        {errors.file && touched.file ? (
                          <small className="text-danger">{errors.file}</small>
                        ) : null}{' '}
                      </div>
                      <div className="button-wrapper text-right mt-2">
                        <button
                          className="btn btn-next btn-lg text-right"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Animate>
          </div>
        </main>
        <div className="backto-top">
          <ScrollToTop showUnder={160}>
            <FiChevronUp />
          </ScrollToTop>
        </div>

        <ToastContainer
          position="bottom-center"
          theme="dark"
          style={{ width: '400px' }}
        />

        <Footer isLoading={false} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.newsReducer.isLoading,
    createNewsData: state.newsReducer.createNewsData,
    createNewsError: state.newsReducer.createNewsError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNews: (values) => dispatch(createNews(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);


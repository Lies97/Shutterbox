import React, { Component } from 'react';
import PageHelmet from '../../../component/common/Helmet';
import Breadcrumb from '../../../elements/common/Breadcrumb';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from 'react-icons/fi';
import Header from '../../../component/header/Header';
import Footer from '../../../component/footer/FooterTwo';
import 'react-image-lightbox/style.css';
import Loading from '../../../component/common/Loading';
import { SignupSchema } from '../../../component/common/SignupSchema';
import { Formik, Form, Field } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import utils from '../../../helper';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordType: 'password',
      confirmPasswordType: 'password',
    };
  }

  handleSubmit = (values) => {
    const finalValues = JSON.parse(JSON.stringify(values));
    Object.keys(finalValues).map((key) => {
      if (key !== 'confirmPassword' && key !== 'password') {
        finalValues[key] = finalValues[key].trim().toLowerCase();
      }
    });
    delete finalValues.confirmPassword;

    // const url = `${utils.apiUrl}/auth/signup`;
    const url = 'http://localhost:4000/auth/signup'
    axios
      .post(url, finalValues)
      .then((res) => {
        if (res) {
          this.handleAlert('Register successfully!', false);
        }
      })
      // .catch((err) => {
      //   this.handleAlert(err.response.data.message);
      // });
  };

  handleAlert = (content, isError = true) => {
    isError
      ? toast.error(content, { autoClose: false })
      : toast.success(content, { theme: 'colored' });
  };

  render() {
    const { isLoading = false } = this.props;
    const { passwordType, confirmPasswordType } = this.state;

    return (
      <div>
        <PageHelmet pageTitle="Registration" />

        {/* Start Header Area  */}
        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />
        {/* End Header Area  */}

        {/* Start Breadcrump Area */}
        <Breadcrumb title={'Registration'} />
        {/* End Breadcrump Area */}

        {/* Start Page Wrapper  */}
        <main className="page-wrapper">
          {/* Start Portfolio Area  */}
          <div className="creative-portfolio-wrapper ptb--120 register-container">
            {/* {isLoading && <Loading />} */}
            <div className="container p--35 bg-white screen-sm">
              <div className="form-container">
                <div className="title text-center">
                  <h3 className="active">Registration Form</h3>
                </div>
                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={(values) => {
                    this.handleSubmit(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="form-group">
                        <label>
                          <span>First name</span>
                          <span className="text-danger"> *</span>
                        </label>{' '}
                        <Field name="firstName" className="form-control" />
                        {errors.firstName && touched.firstName ? (
                          <small className="text-danger">
                            {errors.firstName}
                          </small>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>
                          <span>Last name</span>
                          <span className="text-danger"> *</span>
                        </label>{' '}
                        <Field name="lastName" className="form-control" />
                        {errors.lastName && touched.lastName ? (
                          <small className="text-danger">
                            {errors.lastName}
                          </small>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>
                          <span>Email</span>
                          <span className="text-danger"> *</span>
                        </label>{' '}
                        <Field name="email" className="form-control" />
                        {errors.email && touched.email ? (
                          <small className="text-danger">{errors.email}</small>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>
                          <span>Username</span>
                          <span className="text-danger"> *</span>
                        </label>{' '}
                        <Field name="username" className="form-control" />
                        {errors.username && touched.username ? (
                          <small className="text-danger">
                            {errors.username}
                          </small>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>
                          <span>Password</span>
                          <span className="text-danger"> *</span>
                        </label>{' '}
                        <div className="password-wrapper position-relative">
                          <Field
                            name="password"
                            className="form-control"
                            type={passwordType}
                          />
                          <FontAwesomeIcon
                            icon={['fa', 'eye']}
                            size="md"
                            className="position-absolute icon"
                            onClick={() => {
                              this.setState({
                                passwordType:
                                  passwordType === 'text' ? 'password' : 'text',
                              });
                            }}
                          />
                        </div>
                        {errors.password && touched.password ? (
                          <small className="text-danger">
                            {errors.password}
                          </small>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>
                          <span>Confirm Password</span>
                          <span className="text-danger"> *</span>
                        </label>{' '}
                        <div className="password-wrapper position-relative">
                          <Field
                            name="confirmPassword"
                            className="form-control"
                            type={confirmPasswordType}
                          />
                          <FontAwesomeIcon
                            icon={['fa', 'eye']}
                            size="md"
                            className="position-absolute icon"
                            onClick={() => {
                              this.setState({
                                confirmPasswordType:
                                  confirmPasswordType === 'text'
                                    ? 'password'
                                    : 'text',
                              });
                            }}
                          />
                        </div>
                        {errors.confirmPassword && touched.confirmPassword ? (
                          <small className="text-danger">
                            {errors.confirmPassword}
                          </small>
                        ) : null}
                      </div>
                      <div className="button-wrapper text-right">
                        <button
                          className="btn btn-next btn-lg text-right mt-2"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
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

        <Footer isLoading={isLoading} />
      </div>
    );
  }
}

export default Register;

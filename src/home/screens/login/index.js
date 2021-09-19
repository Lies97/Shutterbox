import React, { Component } from 'react';
import PageHelmet from '../../../component/common/Helmet';
import Breadcrumb from '../../../elements/common/Breadcrumb';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from 'react-icons/fi';
import Header from '../../../component/header/Header';
import Footer from '../../../component/footer/FooterTwo';
import 'react-image-lightbox/style.css';
import Loading from '../../../component/common/Loading';
import { SinginSchema } from '../../../component/common/SingInSchema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import utils from '../../../helper';
import './style.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/auth/login';
import _ from 'lodash';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordType: 'password',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { loginData: nextLoginData, loginError: nextLoginError } = nextProps;
    const { loginData, loginError, history } = this.props;

    if (!_.isEmpty(nextLoginData) && loginData !== nextLoginData) {
      utils.setSessionStorage('user', JSON.stringify(nextLoginData));
      history.push('/order-brief');
    } else if (nextLoginError && loginError !== nextLoginError) {
      this.handleAlert(nextLoginError);
    }
  }

  handleSubmit = (values) => {
    this.props.login(values);
  };

  handleAlert = (content, isError = true) => {
    isError
      ? toast.error(content, { autoClose: false })
      : toast.success(content, { theme: 'colored' });
  };

  render() {
    const { isLoading = false } = this.props;
    const { passwordType } = this.state;
    return (
      <div>
        <PageHelmet pageTitle="Login" />

        {/* Start Header Area  */}
        <Header
          headertransparent="header--transparent"
          colorblack="color--black"
          logoname="logo.png"
        />
        {/* End Header Area  */}

        {/* Start Breadcrump Area */}
        <Breadcrumb title={'Login'} />
        {/* End Breadcrump Area */}

        {/* Start Page Wrapper  */}
        <main className="page-wrapper">
          {/* Start Portfolio Area  */}
          <div
            className={`creative-portfolio-wrapper ptb--120 register-container ${
              isLoading ? 'disabled' : ''
            }`}
          >
            <div className="container p--35 bg-white screen-sm position-relative">
              <div className="form-container">
                {isLoading && <Loading className="center-loading" />}
                <div className="title text-center">
                  <h3 className="active">Login Form</h3>
                </div>
                <Formik
                  initialValues={{
                    username: '',
                    password: '',
                  }}
                  onSubmit={(values) => {
                    this.handleSubmit(values);
                  }}
                  validationSchema={SinginSchema}
                >
                  {({ errors, touched }) => (
                    <Form>
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
                      <div className="button-wrapper text-right mt-2">
                        <button
                          className="btn btn-next btn-lg text-right"
                          type="submit"
                        >
                          Login
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

        <Footer isLoading={false} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.authReducer.isLoading,
    loginData: state.authReducer.loginData,
    loginError: state.authReducer.loginError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (values) => dispatch(login(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

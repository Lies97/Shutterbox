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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordType: 'password',
    };
  }

  handleSubmit = (values) => {
    const url = `${utils.apiUrl}/auth/signin`;
    axios
      .post(url, values)
      .then((res) => {
        if (res.data) {
          utils.setSessionStorage('user', JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        this.handleAlert(err.response.data.message);
      });
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
          <div className="creative-portfolio-wrapper ptb--120 register-container">
            {/* {isLoading && <Loading />} */}
            <div className="container p--35 bg-white screen-sm">
              <div className="form-container">
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

        <Footer isLoading={isLoading} />
      </div>
    );
  }
}

export default Login;

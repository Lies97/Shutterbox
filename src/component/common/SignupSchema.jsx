import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .lowercase()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter you first name'),
  lastName: Yup.string()
    .trim()
    .lowercase()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter you last name'),
  username: Yup.string()
    .trim()
    .lowercase()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter you user name'),
  password: Yup.string()
    .min(
      8,
      'Password must contain at least 8 characters, one uppercase and one number'
    )
    .max(15, 'Too Long!')
    .required('Please enter you password')
    .matches(
      /^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$/,
      'Password must contain at least 8 characters, one uppercase and one number'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], "Passwords don't match."),
  email: Yup.string()
    .trim()
    .lowercase()
    .email('Invalid email')
    .required('Please enter you email'),
});

import * as Yup from 'yup';

export const SinginSchema = Yup.object().shape({
  username: Yup.string().required('Please enter you user name'),
  password: Yup.string().required('Please enter you password'),
});

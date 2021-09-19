import * as Yup from 'yup';

export const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required('Please enter Post Title'),
  description: Yup.string().required('Please enter Post Description'),
  // category: Yup.string().required('Please select the Post Category'),
  author: Yup.string().required('Please enter the Post Author'),
  // file: Yup.object().required()
  file: Yup.mixed().test('file', 'Please upload a image', (value) => {
    return value;
  })
});

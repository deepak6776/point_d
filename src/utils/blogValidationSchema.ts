import * as Yup from 'yup';

const fileValidator = (file: File) => {
  if (!file) return true; // Optional field, so it's valid if not provided
  return file.size <= 1024 * 1024;
};

const NewBlogInfoSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  author: Yup.string().required('Author is required'),
  category: Yup.string().required('Category is required'),
  body: Yup.string().required('Body is required'),
  status: Yup.string().required('Status is required'),
});

export default NewBlogInfoSchema;
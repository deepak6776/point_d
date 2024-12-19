import * as Yup from 'yup';

const fileValidator = (file: File) => {
  if (!file) return true; // Optional field, so it's valid if not provided
  return file.size <= 1024 * 1024;
};

const NewToolCategorySchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  slug: Yup.string().required('Slug is required'),
});

export default NewToolCategorySchema;
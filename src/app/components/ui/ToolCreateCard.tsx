"use client"
import { Flex, VStack, FormControl, FormLabel, Input, Text, Button, Select} from '@chakra-ui/react'
import { Formik, Field, useFormik } from 'formik'
import Link from 'next/link'
import ImageInput from './ImageInput'
import FormContainer from '../FormContainer'
import { object, string } from 'yup'
import ImageSelector from './ImageSelector'
import { ChangeEventHandler, startTransition, useEffect, useState, useTransition } from 'react'
import { NewToolInfo } from '@/types'
import { ValidationError } from 'yup'
import { toast } from 'react-toastify'
// import categories from '@/utils/categories'

// const blogSchema = z.object({
//   title:z.string({required_error:'title is required'}),
//   description:z.string({required_error:'description is required'}),
//   link:z.string({required_error:'link is required'}),
//   category:z.string({required_error:'category is required'}),
//   status:z.string({required_error:'status is required'}),
//   pricing:z.string({required_error:'pricing is required'})
// })

const blogSchema = object({
    title:string().required(),
    description:string().required(),
    link:string().url().required(),
    category:string().required(),
    status:string().required(),
    pricing:string().required()
})

interface Props {
  initialValue?: InitialValue;
  onSubmit(values: NewToolInfo):void
  onImageRemove?(source: string):void
  categories?: string[]
}



export interface InitialValue{
  title: string;
  thumbnail: string;
  description: string;
  category: string;
  link: string;
  status: string;
  author: string
}

const defaultValue = {
  title: "",
  description: "",
  category: "",
  link: "",
  status: "",
  author: "",
};



export default function ToolCreateCard(props:Props) {

  const { onSubmit, onImageRemove, initialValue, categories } = props;

  const [isPending, startTransition] = useTransition();
  const [blogInfo, setBlogInfo] = useState({ ...defaultValue }); 
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [thumbnail, setThumbnail] = useState<File>();
  const [thumbnailSource, setThumbnailSource] = useState<string[]>()
  
  const removeImage = async(index: number) => {
    if(!thumbnailSource) return
  
    const imageToRemove = thumbnailSource;
    const cloudSourceUrl = "https://res.cloudinary.com";
    console.log('from remove image in tool create', imageToRemove[0])
    if(imageToRemove[0].startsWith(cloudSourceUrl)){
      console.log('image to remove', imageToRemove[0])
      onImageRemove && onImageRemove(imageToRemove[0])
    }else{
      setThumbnailSource([]);
    }

  }

  const onThumbnailChange: ChangeEventHandler<HTMLInputElement> = ({target}) => {
    const files = target.files
    if(files){
      const file = files[0]
      setThumbnail(file)
      setThumbnailSource([URL.createObjectURL(file)]);
    }
  }

  const getBtnTitle = () => {
    if (isForUpdate) return isPending ? "Updating" : "Update";
    return isPending ? "Creating" : "Create";
  };

useEffect(() => {
  if (initialValue) {
      setBlogInfo({ ...initialValue });
      setThumbnailSource([initialValue.thumbnail]);
      setIsForUpdate(true);
  }
}, []);

const { values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched, resetForm } = useFormik({
  initialValues: { title: '', description: '', link: '', category: '', status: '', author: '' },
  onSubmit: async (values, action) => {
      console.log("onsubmit toolcreate card page")
      // console.log(values)
      console.log(blogInfo)
      // console.log(thumbnailSource)
      try {
          // await NewBlogInfoSchema.validate(values, { abortEarly: false })
      } catch (error) {
          if (error instanceof ValidationError) {
              error.inner.map((err) => {
                  toast.error(err.message);
              });
          }
      }

   }
 })
    

  const {title, description, link, category,status,author} = values


  return (
    // <Flex width="50%" bgColor="gray.300">
      // <Formik
      //    initialValues={{email:"", password:""}}
      //    onSubmit={handleSubmit}
      //   >
      //     {({handleSubmit}) => (
            // <FormContainer onSubmit={handleSubmit}>
            <form action={ () => 
              startTransition( () => {
                onSubmit({ ...blogInfo, thumbnail });
              })
            }>
              <VStack mt='20px' width="50%">
                <ImageSelector
                  id='1'
                  images={thumbnailSource}
                  onChange={onThumbnailChange}
                  onRemove={removeImage}
                 />
                <FormControl>
                  <FormLabel htmlFor='title'>Title</FormLabel>
                  <Input
                        name="title"
                        id='title'
                        value={blogInfo.title}
                        // placeholder={props.initialValue?.title}
                        onChange={({ target }) =>
                            setBlogInfo({ ...blogInfo, title: target.value })
                        }
                        type="text"
                    />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='description'>Description</FormLabel>
                  <Input
                        name="description"
                        id='description'
                        value={blogInfo.description}
                        // placeholder={props.initialValue?.description}
                        onChange={({ target }) =>
                            setBlogInfo({ ...blogInfo, description: target.value })
                        }
                        type="text"
                    />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='link'>Link</FormLabel>
                  <Input
                        name="link"
                        id='link'
                        value={blogInfo.link}
                        // placeholder={props.initialValue?.link}
                        onChange={({ target }) =>
                            setBlogInfo({ ...blogInfo, link: target.value })
                        }
                        // onChange={handleChange}

                        type="text"
                    />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='toolcategory'>Category</FormLabel>
                  <Select
                        id="toolcategory"
                        value={blogInfo.category}
                        placeholder='Select a category'
                        onChange={({ target }) =>
                            setBlogInfo({ ...blogInfo, category: target.value })
                        }
                    >
                        {categories?.map((c) => (
                            <option value={c} key={c}>
                                {c}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='status'>Status</FormLabel>
                  <Select
                        id="status"
                        placeholder="Select a status"
                        value={props.initialValue?.status}
                        onChange={({ target }) =>
                            setBlogInfo({ ...blogInfo, status: target.value })
                        }
                        // onChange={handleChange}

                    >
                        <option value='draft'>Draft</option>
                        <option value='published'>Published</option>
                    </Select>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='pricing'>Author</FormLabel>
                  <Input
                    name="author"
                    id="author"
                    value={blogInfo.author}
                    // placeholder={props.initialValue?.author}
                    onChange={({ target }) =>
                      setBlogInfo({ ...blogInfo, author: target.value })
                    }
                    type="text"
                  />
                </FormControl>
                <Button type='submit' width="100%" mt='20px'>{getBtnTitle()}</Button>
              </VStack>
            </form>
          // </FormContainer>
        //   )}
        // </Formik>
    // {/* </Flex> */}
  )
}

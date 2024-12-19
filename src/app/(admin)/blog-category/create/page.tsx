'use client'
import BlogCategoryCard from '@/app/components/ui/BlogCategoryCard'
import { NewBlogCategoryInfo } from '@/types'
import NewBlogCategorySchema from '@/utils/blogCategoryValidationSchema'
import { uploadImage } from '@/utils/helper'
import { useRouter } from 'next/navigation'
import React from 'react'
import { createBlogCategory } from '../action'
import { ValidationError } from 'yup'
import { toast } from 'react-toastify'
import { Flex, Text} from '@chakra-ui/react'

export default function BlogCategoryCreate() {

  const router = useRouter()

  const handleCreateBlogCategory = async (values:NewBlogCategoryInfo) => {
    console.log('from blog category create', values)

    try{
      const {thumbnail} = values
      await NewBlogCategorySchema.validate(values, {abortEarly:false})
      const thumbnailRes = await uploadImage(thumbnail!)

      await createBlogCategory({
        ...values,
        thumbnail: thumbnailRes
      });

      router.refresh();
      router.push('/blog-category')


    }catch(error){

      console.log('error inside catch block', error)
      if (error instanceof ValidationError) {
        error.inner.map((err) => {
          toast.error(err.message);
        });
      }

    }
  }


  return (
    <Flex  direction='column' width="80%" ml='auto' p='32px'>
      <Text>Create Blog Category</Text>
      <BlogCategoryCard onSubmit={handleCreateBlogCategory} />
    </Flex>
  )
}

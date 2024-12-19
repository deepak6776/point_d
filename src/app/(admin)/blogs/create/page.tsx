"use client"
import ToolCreateCard from '@/app/components/ui/ToolCreateCard'
import { Flex, Text} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { NewBlogInfo} from '@/types'
import { ValidationError } from 'yup'
import { toast } from 'react-toastify'
import { createProduct } from '../action'
import { uploadImage } from '@/utils/helper'
import BlogCreateCard from '@/app/components/ui/BlogCreateCard/BlogCreateCard'
import NewBlogInfoSchema from '@/utils/blogValidationSchema'

export default function BlogCreate() {

  const router = useRouter();
  const [fetchedCategories, setFetchedCategories]= useState([])


  const handleCreateBlog = async (values: NewBlogInfo) => {
    console.log("from blog create")
    console.log({values})
    try {
      console.log('inside try block in blog create')
      const {thumbnail} = values;
      await NewBlogInfoSchema.validate(values, { abortEarly: false })
      const thumbnailRes = await uploadImage(thumbnail!)
      console.log(thumbnailRes)

      
      await createProduct({
        ...values, 
        thumbnail: thumbnailRes,
      });
      

      router.refresh();
      router.push("/blogs");

    } catch (error) {

      console.log('error inside catch block', error)
      if (error instanceof ValidationError) {
        error.inner.map((err) => {
          toast.error(err.message);
        });
      }
    }
  }

  const fetchData = async () => {
    try{

      const response = await fetch('/api/blog-category-data',{ cache: 'no-store'})

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

     const result = await response.json()

     const blogCategories = result.map((category:any) => { return category.title})

     setFetchedCategories(blogCategories)

     console.log('blog categories from fetchdata function', blogCategories)

    }catch(error){

      console.log('Error', error)

    }
  }

  useEffect(() => {
     
    fetchData();
    console.log('from first useEffect')

  },[])

  useEffect(() => {
    console.log('fetched categories from blog create useEffect', fetchedCategories)
    console.log('from 2nd useEffect')
  },[fetchedCategories])
  
  return (
    <Flex  direction='column' width="80%" ml='auto' p='32px'>
      <Text>Create Blog</Text>
      <BlogCreateCard categories={fetchedCategories} onSubmit={handleCreateBlog} />
    </Flex>
  )
}

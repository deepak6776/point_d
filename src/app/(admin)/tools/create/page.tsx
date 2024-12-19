"use client"
import ToolCreateCard from '@/app/components/ui/ToolCreateCard'
import { Flex, Text} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { NewToolInfo } from '@/types'
import NewToolInfoSchema from '@/utils/toolValidationSchema'
import { ValidationError } from 'yup'
import { toast } from 'react-toastify'
import { createProduct } from '../actions'
import { uploadImage } from '@/utils/helper'

export default function ToolCreate() {
  const router = useRouter();
  const [fetchedCategories, setFetchedCategories] = useState();
  
  const handleCreateProduct = async (values: NewToolInfo) => {
    console.log("from tool create")
    console.log({values})
    try {
      const {thumbnail} = values;
      await NewToolInfoSchema.validate(values, { abortEarly: false })
      const thumbnailRes = await uploadImage(thumbnail!)
      console.log(thumbnailRes)

      
      await createProduct({
        ...values, 
        thumbnail: thumbnailRes,
      });
      

      router.refresh();
      router.push("/tools");

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
      const response = await fetch('/api/tool-category-data')
      if (!response.ok) {
        throw new Error('Network response was not ok');
    }
     const result = await response.json()

     const toolCategories = result.map((category:any) => { return category.title})
      
     console.log('toolcategories', toolCategories)
     setFetchedCategories(toolCategories)
     

    }catch(error){

      console.log('Error', error)

    }
  }

  useEffect(() => {
    fetchData()
  },[])

  
  
  return (
    <Flex  direction='column' width="80%" ml='auto' p='32px'>
      <Text>Create Tool</Text>
      <ToolCreateCard onSubmit={handleCreateProduct} categories={fetchedCategories} />
    </Flex>
  )
}

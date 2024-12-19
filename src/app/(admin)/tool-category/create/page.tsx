'use client'

import { NewToolCategoryInfo } from "@/types"
import { uploadImage } from "@/utils/helper"
import NewToolCategorySchema from "@/utils/toolCategoryValidationSchema"
import { useRouter } from "next/navigation"
import { createToolCategory } from "../actions"
import { ValidationError } from "yup"
import { toast } from "react-toastify"
import ToolCategoryCard from "@/app/components/ui/ToolCategoryCard"
import { Flex, Text } from "@chakra-ui/react"


export default function ToolCategoryCreate() {
    const router = useRouter()

    const handleCreateToolCategory = async (values:NewToolCategoryInfo) => {
      console.log('from tool category create', values)
  
      try{
        const {thumbnail} = values
        await NewToolCategorySchema.validate(values, {abortEarly:false})
        const thumbnailRes = await uploadImage(thumbnail!)
  
        await createToolCategory({
          ...values,
          thumbnail: thumbnailRes
        });
  
        router.refresh();
        router.push('/tool-category')
  
  
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
     <Flex direction='column' width="80%" ml='auto' p='32px'>
       <Text>Create Tool Category</Text>
       <ToolCategoryCard onSubmit={handleCreateToolCategory} />
     </Flex>
  )
}

"use client"
import { NewToolCategoryInfo, ToolCategoryResponse, ToolCategoryToUpdate } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import ToolCategoryCard, { InitialValue } from './ToolCategoryCard'
import { extractPublicId, uploadImage } from '@/utils/helper'
import { removeAndUpdateToolCategoryImage, updateImage, updateToolCategory } from '@/app/(admin)/tool-category/actions'
import NewToolCategorySchema from '@/utils/toolCategoryValidationSchema'
import { ValidationError } from 'yup'
import { toast } from 'react-toastify'

interface Props {
    tool: ToolCategoryResponse
  }

export default function UpdateToolCategory({tool}:Props) {
    const router = useRouter();

    const initialValue: InitialValue = {
        ...tool,
        thumbnail: tool.thumbnail?.url || ""
    } 

    const handleImageRemove = (source: string) => {
        console.log(source)
        const publicId = extractPublicId(source);
        removeAndUpdateToolCategoryImage(tool.id,publicId)
    }

    const handleOnSubmit = async (values: NewToolCategoryInfo) => {
        console.log("handle submit updateToolCategory")
        console.log(`values from handleSubmit: ${values}`)
  
        
        try {
            const { thumbnail } = values;
            //Need to modify schemas to for with and without thumbnail
            await NewToolCategorySchema.validate(values, { abortEarly: false })
  
            const dataToUpdate: ToolCategoryToUpdate = {
                title: values.title,
                description: values.description,
                slug: values.slug,
            };
  
            if (thumbnail) {
                // await startDb();
                // const tblog = await BlogModel.findById(blog.id);
                // if (tblog) {
                //     await removeImageFromCloud(tblog.thumbnail?.id);
                await updateImage(tool.id)
                const { id, url } = await uploadImage(thumbnail);
                dataToUpdate.thumbnail = { id, url };
                console.log("thumbnail from update blog", dataToUpdate.thumbnail)
                console.log("data from update blog", dataToUpdate)
  
            }
  
            await updateToolCategory(tool.id, dataToUpdate);
           
            router.refresh();
            router.push("/tool-category");
  
        } catch (error) {
            if (error instanceof ValidationError) {
                error.inner.map((err) => {
                    toast.error(err.message);
                });
            }
        }
    }

  return (
    <ToolCategoryCard
     initialValue={initialValue}
     onImageRemove={handleImageRemove}
     onSubmit={handleOnSubmit}    
    />
  )
}

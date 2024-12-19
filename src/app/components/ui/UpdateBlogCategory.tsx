"use client"
import React from 'react'

import BlogCategoryCard, { InitialValue } from './BlogCategoryCard'
import { BlogCategoryResponse, BlogCategoryToUpdate, NewBlogCategoryInfo } from '@/types'
import { useRouter } from 'next/navigation';
import { extractPublicId, uploadImage } from '@/utils/helper';
import { removeAndUpdateBlogCategoryImage, updateBlogCategory, updateImage } from '@/app/(admin)/blog-category/action';
import NewBlogCategorySchema from '@/utils/blogCategoryValidationSchema';
import { ValidationError } from 'yup';
import { toast } from 'react-toastify';

interface Props {
    blog: BlogCategoryResponse
  }

export default function UpdateBlogCategory({blog}:Props) {
    const router = useRouter();

    const initialValue: InitialValue = {
        ...blog,
        thumbnail: blog.thumbnail?.url || ""
    } 

    const handleImageRemove = (source: string) => {
        console.log(source)
        const publicId = extractPublicId(source);
        removeAndUpdateBlogCategoryImage(blog.id,publicId)
    }

    const handleOnSubmit = async (values: NewBlogCategoryInfo) => {
        console.log("handle submit updateBlog")
        console.log(`values from handleSubmit: ${values}`)
  
        
        try {
            const { thumbnail } = values;
            //Need to modify schemas to for with and without thumbnail
            await NewBlogCategorySchema.validate(values, { abortEarly: false })
  
            const dataToUpdate: BlogCategoryToUpdate = {
                title: values.title,
                description: values.description,
                slug: values.slug,
            };
  
            if (thumbnail) {
                // await startDb();
                // const tblog = await BlogModel.findById(blog.id);
                // if (tblog) {
                //     await removeImageFromCloud(tblog.thumbnail?.id);
                await updateImage(blog.id)
                const { id, url } = await uploadImage(thumbnail);
                dataToUpdate.thumbnail = { id, url };
                console.log("thumbnail from update blog", dataToUpdate.thumbnail)
                console.log("data from update blog", dataToUpdate)
  
            }
  
            await updateBlogCategory(blog.id, dataToUpdate);
           
            router.refresh();
            router.push("/blog-category");
  
        } catch (error) {
            if (error instanceof ValidationError) {
                error.inner.map((err) => {
                    toast.error(err.message);
                });
            }
        }
    }
    
  return (
    <BlogCategoryCard
      initialValue={initialValue}
      onImageRemove={handleImageRemove}
      onSubmit={handleOnSubmit}
    
    />
  )
}

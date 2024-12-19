"use client"
import { BlogResponse, BlogToUpdate, NewBlogInfo } from '@/types'
import React, { useEffect, useState } from 'react'
import BlogCreateCard, { InitialValue } from './BlogCreateCard/BlogCreateCard'
import { useRouter } from 'next/navigation';
import { extractPublicId, uploadImage } from '@/utils/helper';
import { removeAndUpdateBlogImage, updateBlog, updateImage } from '@/app/(admin)/blogs/action';
import NewBlogInfoSchema from '@/utils/blogValidationSchema';
import { ValidationError } from 'yup';
import { toast } from 'react-toastify';
  

interface Props {
    blog: BlogResponse
  }



export default function UpdateBlog({blog}:Props) {
    const router = useRouter();
    const [fetchedCategories, setFetchedCategories]=useState()
  
    const initialValue: InitialValue = {
        ...blog,
        thumbnail: blog.thumbnail?.url || ""
    } 

    const handleImageRemove = (source: string) => {
        console.log(source)
        const publicId = extractPublicId(source);
        removeAndUpdateBlogImage(blog.id,publicId)
    }

    const handleOnSubmit = async (values: NewBlogInfo) => {
        console.log("handle submit updateBlog")
        console.log(`values from handleSubmit: ${values}`)
  
        
        try {
            const { thumbnail } = values;
            //Need to modify schemas to for with and without thumbnail
            await NewBlogInfoSchema.validate(values, { abortEarly: false })
  
            const dataToUpdate: BlogToUpdate = {
                title: values.title,
                description: values.description,
                body: values.body,
                category: values.category,
                status: values.status,
                author: values.author,
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
  
            await updateBlog(blog.id, dataToUpdate);
           
            router.refresh();
            router.push("/blogs");
  
        } catch (error) {
            if (error instanceof ValidationError) {
                error.inner.map((err) => {
                    toast.error(err.message);
                });
            }
        }
    }

    const fetchData = async () => {
        try{
          const response = await fetch('/api/blog-category-data')
          if (!response.ok) {
            throw new Error('Network response was not ok');
        }
         const result = await response.json()
    
         const blogCategories = result.map((category:any) => { return category.title})
    
         setFetchedCategories(blogCategories)
         
    
        }catch(error){
    
          console.log('Error', error)
    
        }
      }
    
      useEffect(() => {
    
        fetchData();
    
      },[])

  return (
    <BlogCreateCard
     initialValue={initialValue}
     onImageRemove={handleImageRemove}
     onSubmit={handleOnSubmit}
     categories={fetchedCategories}

     />
  )
}

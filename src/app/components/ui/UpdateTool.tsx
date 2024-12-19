'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { ToolResponse, ToolToUpdate, NewToolInfo} from '@/types';
import { extractPublicId, uploadImage } from '@/utils/helper';
// import { removeAndUpdateBlogImage , updateBlog} from '@/app/(admin)/blogs/action';
import { removeAndUpdateToolImage, updateImage, updateTool } from '@/app/(admin)/tools/actions';

import NewToolInfoSchema from '@/utils/toolValidationSchema';
import { ValidationError } from 'yup';
import { toast } from 'react-toastify';
import ToolCreateCard, {InitialValue} from './ToolCreateCard';

interface Props {
  tool: ToolResponse;
}

export default function UpdateTool({tool}:Props) {
   console.log('tool initial value from updateTool:', tool) 
  const router = useRouter();
  const [fetchedCategories, setFetchedCategories] = useState();
  const toolId = tool.id;

  const initialValue: InitialValue = {
      ...tool,
      thumbnail: tool.thumbnail?.url || "",
  };

  const handleImageRemove = (source: string) => {
      console.log(source)
      const publicId = extractPublicId(source);

      removeAndUpdateToolImage(tool.id, publicId);
  };

  const handleOnSubmit = async (values: NewToolInfo) => {
      console.log(`values from updateTool handleSubmit`, values)

      console.log("handle submit updateTool")
      console.log({ values })
      try {
          const { thumbnail } = values;
          //Need to modify schemas to for with and without thumbnail
          await NewToolInfoSchema.validate(values, { abortEarly: false })

          const dataToUpdate: ToolToUpdate = {
              title: values.title,
              description: values.description,
              category: values.category,
              link: values.link,
              status: values.status,
              author: values.author,
          };

          if (thumbnail) {
              // await startDb();
              // const tblog = await BlogModel.findById(blog.id);
              // if (tblog) {
              //     await removeImageFromCloud(tblog.thumbnail?.id);
              await updateImage(tool.id)
              const { id, url } = await uploadImage(thumbnail);
              dataToUpdate.thumbnail = { id, url };
              console.log("thumbnail from update", dataToUpdate.thumbnail)
              console.log("data from update", dataToUpdate)

          }

          await updateTool(tool.id, dataToUpdate);
         
          router.refresh();
          router.push("/tools");

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
      const response = await fetch('/api/tool-category-data')
      if (!response.ok) {
        throw new Error('Network response was not ok');
    }
     const result = await response.json()

     const toolCategories = result.map((category:any) => { return category.title})

     setFetchedCategories(toolCategories)
     

    }catch(error){

      console.log('Error', error)

    }
  }
  useEffect(() => {
    fetchData();
  },[])



  return (
    <ToolCreateCard
      initialValue={initialValue}
      onImageRemove={handleImageRemove}
      // onSubmit={(values) =>{console.log(values)}}
      onSubmit={handleOnSubmit}
      categories={fetchedCategories}
    />
  )
}

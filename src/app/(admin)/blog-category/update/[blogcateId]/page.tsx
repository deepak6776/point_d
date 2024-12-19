import DeleteBlogCategoryModal from '@/app/components/ui/DeleteBlogCategoryModal';
import UpdateBlogCategory from '@/app/components/ui/UpdateBlogCategory';
import startDb from '@/lib/db';
import BlogCategoryModel from '@/models/blogCategoryModel';
import { BlogCategoryResponse } from '@/types';
import { Flex, Text} from '@chakra-ui/react';
import { isValidObjectId } from 'mongoose';
import { redirect } from 'next/navigation';
import React from 'react'

const fetchBlogCategoryInfo = async (blogId: string): Promise<string> => {
 
    if (!isValidObjectId(blogId)) return redirect("/404");
  
    await startDb();
    const blog = await BlogCategoryModel.findById(blogId);
    
    if (!blog) return redirect("/404");
  
    const finalBlog: BlogCategoryResponse = {
  
      id: blog._id.toString(),
      title: blog.title,
      description: blog.description,
      slug: blog.slug,
      thumbnail: blog.thumbnail,   
    };
  
    return JSON.stringify(finalBlog);
  };

export default async function BlogCategoryUpdate({params}:{params:any}) {
    const {blogcateId} = params
  const blog = await fetchBlogCategoryInfo(blogcateId);
  console.log('Blog from blog update', JSON.parse(blog))
  return (
    <Flex  direction='column' width="80%" ml='auto' p='32px'>
      <Text>Edit Blog {JSON.parse(blog).title}</Text>
      <UpdateBlogCategory blog={JSON.parse(blog)} />
      <DeleteBlogCategoryModal blogId={blogcateId} />
    </Flex>
  )
}

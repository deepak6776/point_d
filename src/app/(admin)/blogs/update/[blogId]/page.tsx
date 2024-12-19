import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, useDisclosure} from '@chakra-ui/react'
import React from 'react'
import { isValidObjectId } from 'mongoose';
import { redirect } from 'next/navigation';
import startDb from '@/lib/db';
import { BlogResponse, ToolResponse } from '@/types';
import UpdateTool from '@/app/components/ui/UpdateTool';
import DeleteModal from '@/app/components/ui/DeleteModal';
import UpdateBlog from '@/app/components/ui/UpdateBlog';
import BlogModel from '@/models/blogModel';
import DeleteBlogModal from '@/app/components/ui/DeleteBlogModal';


const fetchBlogInfo = async (blogId: string): Promise<string> => {
 
  if (!isValidObjectId(blogId)) return redirect("/404");

  await startDb();
  const blog = await BlogModel.findById(blogId);
  
  if (!blog) return redirect("/404");

  const finalBlog: BlogResponse = {

    id: blog._id.toString(),
    title: blog.title,
    description: blog.description,
    category: blog.category,
    body: blog.body,
    status: blog.status,
    thumbnail: blog.thumbnail,
    author: blog.author,
  };

  return JSON.stringify(finalBlog);
};





export default async function BlogUpdate({params}:{params:any}) {
  console.log(params)
  const {blogId} = params
  const blog = await fetchBlogInfo(blogId);
  console.log('Blog from blog update', JSON.parse(blog))
  return (
    <Flex  direction='column' width="80%" ml='auto' p='32px'>
      <Text>Edit Blog {JSON.parse(blog).title}</Text>
      <UpdateBlog blog={JSON.parse(blog)} />
      <DeleteBlogModal blogId={blogId} />
    </Flex>
  )
}

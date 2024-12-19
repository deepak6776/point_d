import DeleteToolCategoryModal from '@/app/components/ui/DeleteToolCategoryModal';
import UpdateToolCategory from '@/app/components/ui/UpdateToolCategory';
import startDb from '@/lib/db';
import ToolCategoryModel from '@/models/toolCategoryModel';
import { ToolCategoryResponse } from '@/types';
import { Flex, Text} from '@chakra-ui/react'
import { isValidObjectId } from 'mongoose';
import { redirect } from 'next/navigation';
import React from 'react'

const fetchToolCategoryInfo  = async (toolId: string): Promise<string> =>{
    if (!isValidObjectId(toolId)) return redirect("/404");
    await startDb();

    const tool = await ToolCategoryModel.findById(toolId)

    console.log('tool from fetchtoolcategory', tool)

    if (!tool) return redirect("/404");

    const finalTool: ToolCategoryResponse = {
        id: tool._id.toString(),
        title: tool.title,
        description: tool.description,
        slug: tool.slug,
        thumbnail: tool.thumbnail,   
       
    };
    return JSON.stringify(finalTool)
}



export default async function ToolCategoryUpdate({params}:{params:any}) {
    const {toolcateId} = params
    const tool = await fetchToolCategoryInfo(toolcateId)
  return (
    <Flex  direction='column' width="80%" ml='auto' p='32px'>
      <Text>Edit Tool Category: {JSON.parse(tool).title} </Text>
      <UpdateToolCategory tool={JSON.parse(tool)} />
      <DeleteToolCategoryModal toolId={toolcateId} />
      {/* <UpdateBlogCategory blog={JSON.parse(blog)} />
      <DeleteBlogCategoryModal blogId={blogcateId} /> */}
    </Flex>
  )
}

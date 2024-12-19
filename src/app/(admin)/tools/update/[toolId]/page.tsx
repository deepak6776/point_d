import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, useDisclosure} from '@chakra-ui/react'
import React from 'react'
import { isValidObjectId } from 'mongoose';
import { redirect } from 'next/navigation';
import startDb from '@/lib/db';
import ToolModel from '@/models/toolModel';
import { ToolResponse } from '@/types';
import UpdateTool from '@/app/components/ui/UpdateTool';
import DeleteModal from '@/app/components/ui/DeleteModal';


const fetchToolInfo = async (toolId: string): Promise<string> => {
  if (!isValidObjectId(toolId)) return redirect("/404");

  await startDb();
  const tool = await ToolModel.findById(toolId);
  if (!tool) return redirect("/404");

  const finalTool: ToolResponse = {

    id: tool._id.toString(),
    title: tool.title,
    category: tool.category,
    description: tool.description,
    link: tool.link,
    status: tool.status,
    thumbnail: tool.thumbnail,
    author: tool.author,
  };

  return JSON.stringify(finalTool);
};





export default async function ToolUpdate({params}:{params:any}) {
  const {toolId} = params
  const tool = await fetchToolInfo(toolId);
  return (
    <Flex  direction='column' width="80%" ml='auto' p='32px'>
      <Text>Edit Tool {JSON.parse(tool).title}</Text>
      <UpdateTool tool={JSON.parse(tool)} />
      <DeleteModal toolId={toolId}  />
    </Flex>
  )
}

import DataTable from '@/app/components/ui/DataTable';
import ImageSelector from '@/app/components/ui/ImageSelector'
import startDb from '@/lib/db';
import ToolCategoryModel from '@/models/toolCategoryModel';
import { Button, Flex, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { columns } from './columns';

export interface ToolCategoryInterface{
  id:string,
  title: string;
  description: string;
  thumbnail?: string;
  slug: string;
}

const fetchToolCategoriesData = async() => {
  await startDb();
  const toolCategories = await ToolCategoryModel.find()
        .sort("-createdAt")

   return toolCategories.map((category) => {
      return {
        id: category._id.toString(),
        title:category.title,
        description:category.description,
        thumbnail:category.thumbnail?.url,
        slug: category.slug,
      }

   })

}

export default async function ToolCategory() {
  const fToolCategoriesData = await fetchToolCategoriesData()
  const categories = fToolCategoriesData.map((item) => {
    return item.title
 })

  return (
    <Flex width="80%" ml='auto' p='32px' direction="column" gap="20px">
      <Flex width="100%" height="max-content" alignItems="center">
        <Text mr="auto">Tool Categories</Text>
        <Link href="tool-category/create">
         <Button>Add Item</Button>
        </Link>
      </Flex>
      <DataTable columns={columns} data={fToolCategoriesData} categories={categories} filterDisplay='none' />
    </Flex>
  )
}

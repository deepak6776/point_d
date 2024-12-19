import DataTable from '@/app/components/ui/DataTable';
import ImageSelector from '@/app/components/ui/ImageSelector'
import { Button, Flex, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { columns } from './columns';
import BlogCategoryModel from '@/models/blogCategoryModel';
import startDb from '@/lib/db';

export interface BlogCategoryInterface{
  id:string,
  title: string;
  description: string;
  thumbnail?: string;
  slug: string;
}

const fetchBlogCategoriesData = async() => {
  await startDb();
  const blogCategories = await BlogCategoryModel.find()
        .sort("-createdAt")

   return blogCategories.map((category) => {
      return {
        id: category._id.toString(),
        title:category.title,
        description:category.description,
        thumbnail:category.thumbnail?.url,
        slug: category.slug,
      }

   })

}

export default async function BlogCategory() {
  const fBlogCategoriesData = await fetchBlogCategoriesData()
  const categories = fBlogCategoriesData.map((item) => {
     return item.title
  })

  console.log("fecthed and mapped categories",categories)

  return (
    <Flex width="80%" ml='auto' p='32px' direction="column" gap="20px">
      <Flex width="100%" height="max-content" alignItems="center">
        <Text mr="auto">Blog Categories</Text>
        <Link href="blog-category/create">
         <Button>Add Item</Button>
        </Link>
      </Flex>
      <DataTable columns={columns} data={fBlogCategoriesData} categories={categories} filterDisplay='none' />
    </Flex>
  )
}

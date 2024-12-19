
import { Button, Flex, FormControl, FormLabel, Select, Text } from "@chakra-ui/react"
import Link from "next/link"
import { useState } from "react"
import ToolTable, {Tool as ToolInterface} from "@/app/components/ToolTable"
import startDb from "@/lib/db"
import ToolModel from "@/models/toolModel"
import { redirect } from "next/navigation"
import CategoryFilter from "@/app/components/ui/CategoryFilter"
import BlogModel from "@/models/blogModel"
import DataTable from "@/app/components/ui/DataTable"
import { columns } from "./columns"
import BlogCategoryModel from "@/models/blogCategoryModel"

 export interface BlogInterface{
  id:string,
  title: string;
  description: string;
  thumbnail?: string;
  author: string
  category: string;
  body: string;
  status: string;
}




 const fetchBlogCategories = async ():Promise<any[]> => {
  await startDb();
  const blogCategories = await BlogCategoryModel.find()
        .sort("-createdAt")

   return blogCategories.map((category) => {
      return category.title

   })
}


const fetchBlogs = async (
  pageNo: number,
  perPage: number
): Promise<BlogInterface[]> => {
  const skipCount = (pageNo - 1) * perPage;

  await startDb();
  const blogs = await BlogModel.find()
    .sort("-createdAt")
    .skip(skipCount)
    .limit(perPage);

  // const holdings = blogs.length
  // const holdings_id = blogs[0]._id
  // console.log(holdings_id)
  
  return blogs.map((blog) => {
    return {
      id: blog._id.toString(),
      title:blog.title,
      description:blog.description,
      thumbnail:blog.thumbnail?.url,
      category: blog.category,
      body:blog.body,
      author:blog.author,
      status:blog.status
    };
  });

};

const BLOGS_PER_PAGE = 10;

interface Props {
  searchParams: {page: string}
}

export default async function Blog({searchParams}:Props) {

  const {page = "1"} = searchParams

//  const items = [
//     {title:"Atlassian Design System", category:"Design Guidelines",status:'draft', author:'Pradyun', id:1},
//     {title:"Ant Design System", category:"Design Guidelines",status:'draft', author:'Pradyun', id:2},
//     {title:"Fluid Design System", category:"Design Guidelines",status:'draft', author:'Pradyun', id:3},
//     {title:"Apple Design System", category:"Design Guidelines",status:'draft', author:'Pradyun', id:4},
//     {title:"Uber Design System", category:"Design Guidelines",status:'draft', author:'Pradyun', id:5}
//   ]
    if (isNaN(+page)) return redirect("/404");

    let hasMore = true;
    const fblogs = await fetchBlogs(+page, BLOGS_PER_PAGE);
    const fBlogCategories = await fetchBlogCategories()
    console.log('fetched categories', fBlogCategories)
    if (fblogs.length < BLOGS_PER_PAGE) hasMore = false;
    else hasMore = true;

  return (
    <Flex width="80%" ml='auto' p='32px' direction="column" gap="20px">
      <Flex width="100%" height="max-content" alignItems="center">
        <Text mr="auto">Blogs</Text>
        <Link href="blogs/create">
         <Button>Add Item</Button>
        </Link>
      </Flex>
      {/* <ToolTable
       items={fblogs}
       currentPageNo={+page}
       hasMore={hasMore}
      
      /> */}
      <DataTable columns={columns} data={fblogs} categories={fBlogCategories} filterDisplay="flex" />

      
      {/* <Button onClick={() => setIsLoaded((value)=> !value )}>Toggle Loading State</Button> */}
    </Flex>
  )
}


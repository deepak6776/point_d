"use client"
import { Box, Flex, Heading, SimpleGrid, Text} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Banner from '@/app/components/ui/Banner/Banner';
import PaginationControls from '@/app/components/ui/PaginationControls/PaginationControls';

export default function BlogCategoryPage({params, searchParams}:{params:any, searchParams:any}) {
  
  const [blogs,setBlogs] = useState([]);

  console.log('searchParams', searchParams)

  const page = searchParams['page'] ?? 1
  const per_page = searchParams['per_page'] ?? 1

  const start = (Number(page) - 1) * Number(per_page)
  const end = start + Number(per_page)

  const slicedBlogs = blogs.slice(start, end)
  
  const titleArray = params.categorySlug.toString().split("-").map((word:string) => {
         return word.charAt(0).toUpperCase() + word.slice(1)
       })

  const blogCategory = titleArray.join(" ")


    const fetchBlogs = async() => {
      const response = await fetch('/api/blog-data')
      const result = await response.json()

      const blogs = result.map((blog:any)=>{
          return {
              id: blog._id.toString(),
              title: blog.title,
              description:blog.description,
              thumbnail: blog.thumbnail?.url,
              category: blog.category,
              body: blog.body,
              author:blog.author,
              status:blog.status,
          }
      })
      console.log('blogs from test', blogs)
      
      const filteredBlogs = blogs.filter((blog:any)=>(blog.category == blogCategory))

      setBlogs(filteredBlogs)
  }

  useEffect(() => {
    fetchBlogs()
   },[])

  return (
    <Flex  direction='column'>
        <Banner title={blogCategory}  description=''/>
        <SimpleGrid className={`articlePadding`} columns={{base:1, md:2, lg:3}} gap='42px' mt='20px'>
        {slicedBlogs.map((fBlog:any) =>(
                      <Link  key={fBlog.id} href={`/articles/${params.categorySlug}/${fBlog.id}`}>   
                        <Flex className={`articleCard`} borderRadius='16px' overflow="hidden">
                          <Flex direction='column' borderRadius='14px' overflow='hidden'>
                            <Box overflow="hidden" maxHeight='250px'>
                              <Image src={fBlog.thumbnail || ""} width={700} height={250} alt='cover image' />
                            </Box>
                            <Flex p='20px' direction='column' gap='10px' bgColor='white'>
                                <Text fontSize='14px' color='gray.600'>{fBlog.category.toUpperCase()}</Text>
                                <Heading as='h2' fontSize='24px' fontFamily={`'urw-form', sans-serif`}>{fBlog.title}</Heading>
                                {/* <Text>{fBlog.createdAt.toString().split(" ").slice(1,4).join(" ")}</Text> */}
                                <Text fontSize='18px'>{fBlog.description}</Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Link>
                    ))}
        </SimpleGrid>
        <PaginationControls 
          hasNextPage={end < blogs.length} 
          hasPrevPage={start > 0} 
          slug={params.categorySlug}
          total={Math.ceil(blogs.length/per_page)} />
    </Flex>
  )
}

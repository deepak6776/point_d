import startDb from '@/lib/db';
import BlogModel from '@/models/blogModel';
import { Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const fetchBlogs = async () => {

   
    await startDb();
    const blogs = await BlogModel.find({ status:'published'})
                                  .limit(3)
                                  .sort("-createdAt");
  
    if (!blogs) return redirect("/404");
  
    return blogs.map((blog) => {
        return {
            id: blog._id.toString(),
            title:blog.title,
            description:blog.description,
            thumbnail: blog.thumbnail?.url,
            category: blog.category,
            body: blog.body,
            author:blog.author,
            status:blog.status
        };
    });
  }



export default async function FeaturedArticles() {
    const allBlogs = await fetchBlogs()
  return (
    <Text>Featured Articles</Text>
    // <Flex className={`basePadding`} direction="column">
    //      <Text className={`subheading`}>Featured Articles</Text>
    //      <SimpleGrid columns={{base:1, md:2, lg:3}} gap='42px' mt='20px'>
    //        {allBlogs.map((fBlog) =>(
    //                <Link key={fBlog.id} href={`/articles/${fBlog.category.toLowerCase().split(" ").join("-")}/${fBlog.id   }`}>
    //                    <Flex border='1px solid black' borderRadius='16px' overflow="hidden">
    //                      <Flex direction='column'>
    //                         <Box overflow="hidden" maxHeight='250px'>
    //                             <Image src={fBlog.thumbnail || ""} width={700} height={250} alt='cover image' />
    //                         </Box>
    //                         <Flex p='20px' direction='column' gap='10px'>
    //                           <Text fontSize='14px' color='gray.600'>{fBlog.category.toUpperCase()}</Text>
    //                           <Heading as='h2' fontSize='24px' fontFamily={`'urw-form', sans-serif`}>{fBlog.title}</Heading>
    //                           <Text fontSize='18px'>{fBlog.description}</Text>
    //                         </Flex>
    //                      </Flex>
    //                   </Flex>
    //                </Link>
    //             ))}      
    //      </SimpleGrid>
    //      <Link href='/articles'>
    //        <Button
    //         className={`btn`}
    //         bgColor="white !important"
    //         color="#1F1F1F !important"
    //         border=' 1px solid #545454'
    //         _hover={{bgColor:"gray.100 !important"}}
    //         mt='60px'>
    //             Explore More
    //        </Button>
    //      </Link>      
    // </Flex>
  )
}

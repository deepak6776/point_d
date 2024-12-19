'use client'
import startDb from '@/lib/db';
import BlogModel from '@/models/blogModel';
import { Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import BlogCategoryModel from '@/models/blogCategoryModel';
import Card from '../components/ui/Card/Card';
import Banner from '../components/ui/Banner/Banner';
import Link from 'next/link';

// const fetchBlogs = async () => {

   
//     await startDb();
//     const blogs = await BlogModel.find({ status:'published'});
  
//     if (!blogs) return redirect("/404");
//     // console.log(blogs)
  
//     return blogs.map((blog) => {
//         return {
//             id: blog._id.toString(),
//             title:blog.title,
//             description:blog.description,
//             thumbnail: blog.thumbnail?.url,
//             category: blog.category,
//             body: blog.body,
//             author:blog.author,
//             status:blog.status,
//         };
//     });
//   }

//   const fetchBlogCategories = async ():Promise<any[]> => {
//     await startDb();
//     const blogCategories = await BlogCategoryModel.find()
//           .sort("createdAt")
  
//      return blogCategories.map((category) => {
//         return {
//           id:category._id.toString(),
//           title:category.title,
//           description: category.description,
//           slug: category.slug,
//           thumbnail: category.thumbnail?.url
//         }
  
//      })
//   }




export default function Articles() {
    // const allBlogs = await fetchBlogs()

    // const blogCategories = await fetchBlogCategories()    

    const [categories, setCategories] = useState([]);
    const [blogs,setBlogs]=useState([]);


    const fetchCategories = async () => {
        const response = await fetch('/api/blog-category-data')
        const categories = await response.json()
        
        setCategories(categories)  
    }

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

        setBlogs(blogs)
    }


    useEffect(() => {
     fetchCategories();
     fetchBlogs()
    },[])

  return (
    <Flex direction='column'>
      <Banner 
       title="Articles"
       description="Dive into trends, tips, and tools shaping the future of design."

      
      />
        <Flex className={`articlePadding`} direction='column'>
          <Flex gap='20px'>
            <Flex width='30%' direction='column'>
              <Flex direction='column' position='sticky' top='10px'>
                {categories.map((category:any) => (
                   <Box key={category.title} borderRadius="8px" px='10px' my='10px'
                    onClick={(e) =>{
                       e.preventDefault();
                       document.getElementById(category.title)?.scrollIntoView({behavior:'smooth', block:'start'});
                    }}
                   >
                     <Text
                      my='10px'
                      cursor="pointer"
                      fontWeight='500'
                     >
                      {category.title}
                     </Text>
                   </Box>
                ))}
              </Flex>
            </Flex>
            <Flex width='70%' direction='column'>
              {categories.map((category:any)=>(
                  <Flex key={category.id} id={category.title} direction='column' mb='80px'>
                     <Flex borderBottom='1px solid' borderColor='gray.200' pb='10px' justifyContent='space-between'>
                       <Heading as='h2'>{category.title}</Heading>
                       <Link href={`/articles/${category.slug}`}>
                         <Button color='white' bgColor='black' _hover={{bgColor:'gray.700'}}>View All</Button>
                       </Link>
                     </Flex>
                    {blogs.filter((blog:any) => (blog.category == category.title)).map((fBlog:any) =>(
                      <Link  key={fBlog.id} href={`/articles/${category.slug}/${fBlog.id}`}>
                        <Flex my='20px' gap='20px' >
                          <Box overflow='hidden' borderRadius='8px'>
                            <Image src={fBlog.thumbnail || ''} width={200} height={200} alt='image'/>
                          </Box>
                          <Flex direction='column'>
                            <Text fontSize="20px" fontWeight='500'>{fBlog.title}</Text>
                            <Text fontSize='14px'>{fBlog.description}</Text>
                          </Flex>
                        </Flex>
                      </Link>
                    ))}
                  </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
    </Flex>
  )
}

"use client"
import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';




export default function TestPage() {
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
    <div>
       {categories.map((category:any)=>(
        <p key={category._id.toString()}>{category.title}</p>
       ))}

       <SimpleGrid columns={{base:1, md:2, lg:3}} gap='42px' mt='20px'>
         {blogs.map((blog:any)=>(
            <Flex key={blog.title} direction='column'>
                <Image src={blog.thumbnail} width={150} height={100} alt="image" />
                <Text>{blog.title}</Text>
                <Text>{blog.description}</Text>

            </Flex>
         ))}
        
       </SimpleGrid>
      
    </div>
  )
}

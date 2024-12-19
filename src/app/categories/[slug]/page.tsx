import Banner from '@/app/components/ui/Banner/Banner'
import { Flex, Text, Box, SimpleGrid} from '@chakra-ui/react'
import React from 'react'
import categoriesDescription from '@/utils/categoriesDescription'
import startDb from '@/lib/db';
import { redirect } from 'next/navigation';
import BlogModel from '@/models/toolModel';
import ToolModel from '@/models/toolModel';
import styles from './page.module.css'
import Image from 'next/image';
import Link from 'next/link';


interface Props {
  params: {
      categories: string[];
  };
}

const fetchTools = async (category: string) => {
  console.log(category)
  // const values = category  
  let searchCategory = ""
  let searchDescription = "" 

  for (let i = 0; i < categoriesDescription.length; i++) {
      if (categoriesDescription[i].slug === category){
          searchCategory = categoriesDescription[i].title
          searchDescription = categoriesDescription[i].description
      }
      
    } 
  
  // console.log(searchCategory)
  // console.log(searchDescription)

  if (!searchCategory) return redirect("/404");
  // if (!isValidObjectId(category)) return redirect("/404");
  // console.log(category)
  await startDb();
  const tools = await ToolModel.find({ category: searchCategory, status:'published'});
  // console.log(blog)

  if (!tools) return redirect("/404");
  // console.log(blogs)

  return tools.map((tool) => {
      return {
          id: tool._id.toString(),
          title: tool.title,
          thumbnail: tool.thumbnail?.url,
          description: tool.description,
          category: tool.category,
          link: tool.link,
          author: tool.author,
          status: tool.status
      };
  });
}

export default async function Categories({params}:any) {

  const ftools = await fetchTools(params.slug)

  let searchCategory = ""
    let searchDescription = "" 

    for (let i = 0; i < categoriesDescription.length; i++) {
        if (categoriesDescription[i].slug === params.slug){
            searchCategory = categoriesDescription[i].title
            searchDescription = categoriesDescription[i].description
        }
        
      } 

  return (
    <Flex direction='column'>
      <Banner
       title={searchCategory}
       description={searchDescription}
       />
       <SimpleGrid className={`basePadding`} columns={{ base: 1, md: 2, lg: 3 }} gap='48px'>
                    {ftools.map((ftool) => {
                        return (
                            <Link href={ftool.link || ""} target="_blank" key={ftool.id}>
                                <Flex className={styles.card}>
                                    <Flex direction='column' borderRadius='14px' overflow="hidden" role='group'>
                                        <Box overflow="hidden">
                                            <Image src={ftool.thumbnail || ""} width={700} height={250} alt='cover image' />
                                        </Box>
                                        <Flex direction='column' flexGrow='1' _hover={{ bgColor: "#FAFCFE" }} bgColor="#F7FAFE" padding="16px" position='relative'>
                                            <Box position="absolute" top="16px" right="0" opacity='0' transition='opacity 300ms' _groupHover={{ opacity: "1" }}>
                                                <Image src='/arrow.svg' width='50' height="50" alt="illustration of an arrow" />
                                            </Box>
                                            <Text fontSize="20px" fontWeight="600" mt="16px" mb='8px'>{ftool.title}</Text>
                                            <Text>{ftool.description}</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Link>
                        )
                    })}
                </SimpleGrid>
    </Flex>
  )
}

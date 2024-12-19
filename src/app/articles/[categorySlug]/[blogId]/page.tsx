import BackButton from '@/app/components/ui/BackButton';
import Banner from '@/app/components/ui/Banner/Banner';
import startDb from '@/lib/db';
import BlogModel from '@/models/blogModel';
import { Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Markdown from 'react-markdown';



const fetchBlogs = async () => {

    await startDb();
    const blogs = await BlogModel.find({ status:'published'});

  
    if (!blogs) return redirect("/404");
    return blogs.map((blog:any) => {
        return {
            id: blog._id.toString(),
            title:blog.title,
            description:blog.description,
            thumbnail: blog.thumbnail?.url,
            category: blog.category,
            body: blog.body,
            author:blog.author,
            status:blog.status,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt
        };
    });
}

export default async function BlogPage({params}:{params:any}) {
    
    const {blogId, categorySlug} = params
  
    const filterCategory = categorySlug.split("-").map((word:string)=>(word.charAt(0).toUpperCase()+ word.slice(1))).join(" ")

    
   const articles = await fetchBlogs();
   const finalArticle = articles.filter((item)=> (item.id == blogId))
   const relatedArticles = articles.filter((item) => (item.category == filterCategory && item.id !== blogId))


   let wordCount = finalArticle[0].body.split(" ").length

   let timeToRead = Math.ceil(wordCount/200)

   let date = new Date(finalArticle[0].updatedAt).toLocaleString("en-GB", {year:'numeric', month:'long', day:'numeric'})



   

  return (
    <>
    <Banner title={finalArticle[0].title} description={finalArticle[0].description} />
    <Flex className={`articlePadding`} direction='column' gap='40px'>
        <Box width='100%' borderRadius='12px' height='500px' overflow='hidden' bgColor='gray'>
          <Image priority src={finalArticle[0].thumbnail || ''} alt='scenic image' width='2000' height='300' />
        </Box>
        <Flex direction='row'>
            <Flex width='35%' direction='column' >
              <Flex position='sticky' top='10px' direction='column' gap='10px' >  
                <Heading>{finalArticle[0].title}</Heading>
                <Text as='text' fontSize='20px' fontWeight='500'>by {finalArticle[0].author}</Text>
                <Text as='text'>{date}</Text>
                <Text as='text'> {timeToRead} min read</Text>
              </Flex>
            </Flex>
            <Flex className='blogBody' width='65%' direction='column'>
                <Box whiteSpace="pre-line" dangerouslySetInnerHTML={{__html: finalArticle[0].body}}></Box>
                {/* <Markdown>{finalArticle[0].body}</Markdown> */}
            </Flex>
        </Flex>
        <Flex direction='column' mt='80px'>
            <Flex justifyContent='space-between'>
                <Heading as='h2'>Related Articles</Heading>
                <Link href='/articles'>
                 <Button color='white' bgColor='black' _hover={{bgColor:'gray.700'}}>View all articles</Button>
                </Link>
            </Flex>
            <SimpleGrid columns={{base:1, md:2, lg:3}} gap='42px' mt='20px'>
                {relatedArticles.map((article)=>(
                    <Link key={article.id} href={`/articles/${categorySlug}/${article.id}`}>
                    <Flex className={`articleCard`} borderRadius='16px' overflow="hidden">
                     <Flex direction='column' borderRadius='14px' overflow='hidden'>
                        <Box overflow="hidden" maxHeight='250px'>
                            <Image src={article.thumbnail || ""} width={700} height={250} alt='cover image' />
                        </Box>
                        <Flex p='20px' direction='column' gap='10px' bgColor='white'>
                            <Text fontSize='14px' color='gray.600'>{article.category.toUpperCase()}</Text>
                            <Heading as='h3' fontSize='24px' fontFamily={`'urw-form', sans-serif`}>{article.title}</Heading>
                            {/* <Text>{article.createdAt.toString().split(" ").slice(1,4).join(" ")}</Text> */}
                            <Text fontSize='18px'>{article.description}</Text>
                        </Flex>
                     </Flex>
                    </Flex>
                  </Link>
                ))}
            </SimpleGrid>
        </Flex>
   </Flex>
   </>
  )
}

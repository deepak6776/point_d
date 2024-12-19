import { Flex, SimpleGrid, Text, Heading} from '@chakra-ui/react'
import Card from './ui/Card/Card'
import Image from 'next/image'
import categoriesDescription from '@/utils/categoriesDescription'
import startDb from '@/lib/db'
import ToolCategoryModel from '@/models/toolCategoryModel'

let dummyData = categoriesDescription

const fetchToolCategories = async():Promise<any[]> => {
  await startDb();

  const toolCategories = await ToolCategoryModel.find().collation({locale:'en'}).sort({title: 1});

  return toolCategories.map((category)=> {
    return{
      id:category._id.toString(),
      title:category.title,
      slug:category.slug,
      thumbnail: category.thumbnail?.url,
      description: category.description

    }
  })
}



export default async function Resources() {

  const fToolCategories = await fetchToolCategories()
 
  return (
   <Flex className={`basePadding`} direction="column" id='resources'>
    <Text className={`subheading`}>What are you looking for today?</Text>
    <SimpleGrid columns={{base:1, md:2, lg:3}} gap='42px'>
      {fToolCategories.map((item)=>(
        <Card key={item.title} link={`/categories/${item.slug}`}>
          <Flex direction="column" p="30px">
            <Image src={item.thumbnail} width={56} height={56} alt='svg illustration' />
            <Heading as='h2' mt='30px'>{item.title}</Heading>
            <Text>{item.description}</Text>
          </Flex>
        </Card>
      ))}
     
    </SimpleGrid>
   </Flex>
  )
}
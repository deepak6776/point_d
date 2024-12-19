import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import Card from './ui/Card/Card'

export default function AffiliateProductsSection() {
  return (
    <Flex className={`basePadding`} direction="column">
      <Heading as="h2">Curated Books & Supplies</Heading>
      <SimpleGrid columns={{base:1, md:2, lg:3}} gap='42px' mt='24px'>
        <Card link='/'>
          <Flex height="600px" width="430px" p="30px">
            <Text>Design of Everyday things</Text>
          </Flex>
        </Card>
        <Card link='/'>
          <Flex height="600px" width="430px" p="30px">
            <Text>Design of Everyday things</Text>
          </Flex>
        </Card>
        <Card link='/'>
          <Flex height="600px" width="430px" p="30px">
            <Text>Design of Everyday things</Text>
          </Flex>
        </Card>
      </SimpleGrid>

    </Flex>
  )
}

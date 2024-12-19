import AffiliateCreateCard from '@/app/components/ui/AffiliateCreateCard'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function AffiliateCreate() {
  return (
    <Flex  direction='column'  height='100vh' width="80%" ml='auto' p='32px'>
      <Text>Create Affiliate Product Listing</Text>
      <AffiliateCreateCard />

    </Flex>
  )
}

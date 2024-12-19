import { Button, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function Affiliate() {
  return (
    <Flex height='100vh' width="80%" ml='auto' p='32px' direction="column" gap="20px">
      <Flex width="100%" height="max-content" alignItems="center">
        <Text mr="auto">Affiliate Products</Text>
        <Link href="affiliate/create">
         <Button>Add Item</Button>
        </Link>
      </Flex>

    </Flex>
  )
}

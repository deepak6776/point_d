import { Flex, Text} from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

export default function SideBarItem({icon, item}:{icon:string, item:string}) {
  return (
    <Flex gap='12px' alignItems='center' my='16px'>
      <Image src={icon} width="20" height="20" alt="svg icon" />
      <Text fontWeight="500">{item}</Text>
    </Flex>
  )
}

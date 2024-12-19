import { Flex } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react'

interface Props {
  src ?: string;
}

export default function SelectedImageThumb({src}:Props) {
  if(!src) return null
  return (
    <Flex width="80px" height="80px">
      <Image
       src={src}
       alt="image"
       width={80}
       height={80}
      />
    </Flex>
  )
}

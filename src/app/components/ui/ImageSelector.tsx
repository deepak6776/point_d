'use client'
import { Flex, Box, Text} from '@chakra-ui/react'
import React, { ChangeEventHandler } from 'react'
import ImageInput from './ImageInput'
import { DeleteIcon, PlusSquareIcon } from '@chakra-ui/icons'
import SelectedImageThumb from './SelectedImageThumb'

interface Props {
  id: string
  images?: string[]
  onChange?: ChangeEventHandler<HTMLInputElement>
  onRemove?(index: number):void
}



export default function ImageSelector({id, onChange,images, onRemove}:Props) {
  return (
    <Flex gap="10px">
      {images?.map((img, index) => {
       return(
        <Flex position='relative' direction="column" key={index} borderRadius="4px" overflow="hidden">
          <SelectedImageThumb src={img} />
          <Flex 
            alignItems='center' 
            justifyContent="center" 
            py="4px"  
            onClick={() => onRemove && onRemove(index)} 
            bgColor='blackAlpha.600' 
            cursor="pointer">
             <DeleteIcon color="white" top="50%"/>
          </Flex>
        </Flex>
       )
      })}
      <ImageInput id={id} onChange={onChange}>
        <PlusSquareIcon />
      </ImageInput>
    </Flex>
  )
}

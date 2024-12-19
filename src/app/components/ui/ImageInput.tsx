import { Box, Flex, FormLabel, Input } from '@chakra-ui/react'
import React, {InputHTMLAttributes, ReactNode} from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}


export default function ImageInput({id, onChange, children, ...rest}:Props) {
  if(children) rest.hidden = true;
  else rest.hidden = false;


  return (
    <FormLabel htmlFor={id}>
      <Input
       id={id}
       type="file"
       onChange={onChange}
       accept="image/*"
       hidden={true}
      />
      <Flex width="60px" height="80px" border='1px solid gray' borderRadius="4px" alignItems='center' justifyContent='center'>
        {children}
      </Flex>
    </FormLabel>
  )
}

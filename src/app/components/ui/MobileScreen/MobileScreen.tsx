'use client'
import React from 'react'
import { Flex, Box, Text} from '@chakra-ui/react'
import style from './mobilescreen.module.css'

interface MobileApp {
    app: string,
    tags: string[],
}

export default function MobileScreen({app, tags}: MobileApp) {

  return (
    <Flex direction='column' gap='20px' width={{base:'max-content'}} mx={{base:'auto'}}>
        <Box borderRadius="24px" overflow='hidden' width={{base:'300px', lg:'320px'}}>
            <video 
             onMouseOver={(e)=> {
              let elem = e.target as HTMLVideoElement
              elem.play()
             }}
             onMouseLeave={(e)=> {
              let elem = e.target as HTMLVideoElement
              elem.pause()
             }}
             playsInline 
             loop 
             controls 
             src="https://framerusercontent.com/assets/i7dgyeQ7jJtMUED6Yp9oSuuSLOM.mp4"></video>
        </Box>
        <Flex direction='column' gap='8px' justifyItems='left'>
            <Text fontWeight='600' fontSize='20px'>{app}</Text>
            <Flex color='grey' gap='5px'>
                {tags.map((tag)=>(
                  <Text key={tag} className={`${style.tagPill}`} >{tag}</Text>
                ))}
            </Flex>
        </Flex>
   </Flex>
  )
}

'use client'
import Image from 'next/image'
import { Text, Flex } from '@chakra-ui/react'
import Link from 'next/link'


export default function Footer() {
  return (
    <Flex as='footer' className='footer'>
      <Flex className='footerDiv'>
        <Flex className='footerLogo'>
          <Image src="/footerLogo.svg" alt ="Point logo" width={88} height={32} />
        </Flex>
        <Text mx='auto'textAlign={{base:'center'}}>Copyright 2024 PencilHacker. All rights reserved.</Text>
        <Flex className='socials'>
          <Link href="https://www.linkedin.com/showcase/point-sharpener-design" target='_blank'>
            <Image src='/linkedin.svg' width={24} height={24} alt='linkedin logo' />
          </Link>
          <Link href="https://www.facebook.com/sharpener.design" target='_blank'>
            <Image src='/facebook.svg' width={24} height={24} alt='facebook logo' />
          </Link>
          <Link href="https://www.instagram.com/point.sharpener.design/" target='_blank'>
            <Image src='/instagram.svg' width={24} height={24} alt='instagram logo' />
          </Link>
        </Flex>

      </Flex>

    </Flex>
  )
}

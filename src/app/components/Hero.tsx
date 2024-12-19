import React from 'react'
import Image from 'next/image'
import { Heading, Flex, Text, Button} from '@chakra-ui/react'
import Link from 'next/link'
import ExploreResourcesButton from './ui/ExploreResourcesButton'


export default function Hero() {
  return (
    <Flex className={`heroBg`}>
      <Flex direction="column" className={`hero basePadding`}>
        <Heading as='h1' mt='2rem'>Handpicked resources to power your design journey.</Heading>
        <Text textAlign='center'>Inspire your creative process with an expanding library of tools and resources.</Text>
          <Flex direction={{base:'column', md:'row'}} gap={{base:'10px', md:'24px'}}>
            <ExploreResourcesButton />
            <Link href=' https://t.ly/ATsAn' target="_blank">
              <Button
                className={`btn`}
                bgColor="white !important"
                color="#1F1F1F !important"
                border=' 1px solid #545454'
                >
                  Join the waitlist
              </Button>
            </Link>
          </Flex>
        <Image src='/hero.webp' width={900} height={320} alt=' a collage of icons' priority />
      </Flex>
    </Flex>
  )
}

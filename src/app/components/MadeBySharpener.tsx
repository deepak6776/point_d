import { Flex, Heading, Text, Button } from '@chakra-ui/react'
import Image from 'next/image'
import { Satisfy } from 'next/font/google'
import Link from 'next/link';

const satisfy = Satisfy({weight:"400", subsets:["latin"]});

export default function MadeBySharpener() {
  return (
    <Flex className={`madeby`}>
      <Flex className={`basePadding`} alignItems='center' direction="column">
        <Text className={satisfy.className} fontSize="32px">made with love by</Text>
      
        <Link href="https://www.sharpener.design/" target="_blank">
          <Flex alignItems='center' justifyContent='center' gap='12px'>
            <Image src='/sharpenerLogo.svg' width='350' height='100' alt='sharpener company logo' />
          </Flex>
        </Link>
        <Link href="https://www.buymeacoffee.com/pencilhacker" target="_blank">
          <Button className={`btn`} bgColor="#ADC4EB !important">
            <Flex alignItems='center' gap='10px'>
              <Image src="/cup.svg" width="40" height="40" alt="illustation of a coffee cup" />
              <Text className={satisfy.className} fontSize="28px" color="black" fontWeight="400">buy us a coffee</Text>
            </Flex>
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}

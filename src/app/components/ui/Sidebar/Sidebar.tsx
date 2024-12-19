"use client"
import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import SideBarItem from '../SideBarItem'
import Link from 'next/link'
import { signOut } from 'next-auth/react'


export default function Sidebar() {
  return (
    <Box as='aside' width={{md:'25%', lg:'20%'}} height="100vh" position='fixed' bgColor="#E5EBF8" display={{base:'none', md:'block'}} p='32px' >

      <Flex mb='60px' width='100%' >
        <Link href='/'>
          <Image src="/logo.svg" width="88" height="32" alt="Point logo" />
        </Link>
      </Flex>
      <Flex direction="column" height="85%">
        <Link href="/dashboard">
          <SideBarItem icon='/barGraph.svg' item="Dashboard" />
        </Link>
        <Link href="/blogs">
          <SideBarItem icon='/barGraph.svg' item="Blogs" />
        </Link>
        <Link href="/blog-category">
          <SideBarItem icon='/barGraph.svg' item="Blog Category" />
        </Link>
        <Link href="/tools">
          <SideBarItem icon='/barGraph.svg' item="Tools" />
        </Link>
        <Link href="/tool-category">
          <SideBarItem icon='/barGraph.svg' item="Tool Category" />
        </Link>
        {/* <Link href="/affiliate">
          <SideBarItem icon='/barGraph.svg' item="Affiliate Products" />
        </Link> */}
        <Flex mt='auto' onClick={async() => {await signOut();}} cursor="pointer">
          <SideBarItem icon='/logout.svg' item="Log out" />
        </Flex>
      </Flex>
   </Box>
  )
}

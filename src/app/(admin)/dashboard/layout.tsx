import Sidebar from '@/app/components/ui/Sidebar/Sidebar';
import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     {children}
    </>
   
  )
}

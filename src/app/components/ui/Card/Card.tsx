import { Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import styles from './card.module.css'
import Link from 'next/link'

export default function Card({children, link}:{children:ReactNode, link:string}) {
  return (
    <Link href={link}>
      <Flex className={styles.card}>
        {children}
      </Flex>
    </Link>
  
  )
}

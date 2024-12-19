'use client'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useSearchParams, useRouter} from 'next/navigation'

import React, { FC } from 'react'

interface PaginationProps{
    hasNextPage: boolean
    hasPrevPage: boolean
    slug: string
    total:number
}

const PaginationControls:FC<PaginationProps> = ({hasNextPage, hasPrevPage, slug, total}) => {

    const router = useRouter()
    const searchParams = useSearchParams();

    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '1'
  return (
    <Flex gap='20px' alignItems='center' justifyContent='center'>
        <Button 
         isDisabled={!hasPrevPage} 
         onClick={() => {
            router.push(`/articles/${slug}/?page=${Number(page)-1}&per_page=${Number(per_page)}`)
         }} 
        > 
         Previous
        </Button>
        <Text>{page} of {total}</Text>
        <Button
         isDisabled={!hasNextPage}
         onClick={() => {
            router.push(`/articles/${slug}/?page=${Number(page)+1}&per_page=${Number(per_page)}`)
         }} 

        >
            Next
        </Button>
        
    </Flex>
  )
}

export default PaginationControls


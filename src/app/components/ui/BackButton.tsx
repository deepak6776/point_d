"use client"
import { Button, IconButton, Box} from '@chakra-ui/react'
import Link from 'next/link'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  return (
    
    <Box width="max-content" onClick={()=>{router.back();}}>
      {/* <Link href="/"> */}
        <IconButton
          bgColor="rgba(255,255,255,0.5)"
          _hover={{bgColor:'rgba(255,255,255,0.8)'}}
          icon={<ArrowBackIcon />}
          aria-label='Go back'
          size="lg" />
      {/* </Link> */}
    </Box>
  )
}

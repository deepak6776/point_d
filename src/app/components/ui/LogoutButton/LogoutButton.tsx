import { Button } from '@chakra-ui/react'
import React from 'react'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <Button 
      variant='outline' 
      border='1px solid black' 
      ml="10px"
      onClick={ async () => { await signOut(); }}
    >
      Logout
    </Button>
  )
}

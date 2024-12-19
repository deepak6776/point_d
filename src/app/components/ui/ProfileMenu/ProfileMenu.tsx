import useAuth from '@/hooks/useAuth';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Avatar, Menu, MenuButton, MenuItem, MenuList, Flex, useDisclosure, Text} from '@chakra-ui/react'
import React from 'react'
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfileMenu() {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const {isAdmin} = useAuth()

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton mx='10px' p='10px' _hover={{bgColor:'gray.200'}} borderRadius="40%" onClick={onOpen}>
        <Flex alignItems='center'>
          <Avatar size='sm' />
          {isOpen ? <ChevronUpIcon ml='5px' /> :<ChevronDownIcon ml='5px' /> }
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>
         <Flex gap='10px'>
          <Image width='20' height='20' alt='svg of user avatar' src='/user.svg' />
          <Text>My Profile</Text>
         </Flex>
        </MenuItem>
        {isAdmin? <Link href='/dashboard'>
                   <MenuItem>
                    <Flex gap='10px'>
                      <Image width='20' height='20' alt='svg of user avatar' src='/dashboard.svg' />
                      <Text>Dashboard</Text>
                    </Flex>        
                   </MenuItem>
                  </Link>
                : null}
        <MenuItem onClick={ async () => { await signOut(); }}>
          <Flex gap='10px'>
            <Image width='20' height='20' alt='svg of user avatar' src='/logout.svg' />
            <Text>Logout</Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

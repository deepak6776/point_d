"use client"
import { Button, Flex, Box, Spinner} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Signin from './ui/Signin/Signin'
import Signup from './ui/Signup/Signup'
import useAuth from '@/hooks/useAuth'
import { signOut } from 'next-auth/react'
import LogoutButton from './ui/LogoutButton/LogoutButton'
import ProfileMenu from './ui/ProfileMenu/ProfileMenu'



export default function Navbar() {

  const [scrollY, setScrollY] = useState(0)
  const [prevScroll, setPrevScroll]= useState(0)
  const [hidden, setHidden] = useState(false)
  const {loggedIn, loading} = useAuth();

  useEffect(() => {
    const handleScroll = () =>{
      setPrevScroll(scrollY)
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll);

    if(scrollY < prevScroll){
      setHidden(false)
    }else if(scrollY > 20 && scrollY > prevScroll){
      setHidden(true)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    };

  },[scrollY])

  return ( 
    <Flex as="nav" position="fixed" zIndex={4}  className={`${hidden ? 'hide' : 'show'} navBg ease`}>
      <Flex  className='navbar'>
        <Image src='/logo.svg' alt='point logo' width={88} height={32} priority/>
        
        <Flex ml='auto' alignItems='center'>
          <Link href='https://forms.gle/1kijCiQmd8XenfPF8' target='_blank'>
            <Button  variant='outline' border='1px solid black' >Suggest a tool</Button>
          </Link>
          {loggedIn ?<> <ProfileMenu /> </> : 
            loading ? <Spinner ml="10px" /> :
              <>
                {/* <Signin />
                <Signup /> */}
              </>
          }
        </Flex>
      </Flex>
    </Flex>
  )
}

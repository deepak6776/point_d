import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Signup() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <>
     <Link href="/auth/signup">
      <Button onClick={onOpen} variant='outline' border='1px solid black' ml="10px">Sign up</Button>
    </Link>
     {/* <Modal isOpen={isOpen} onClose={onClose} size="4xl" preserveScrollBarGap={true}>
      <ModalOverlay backgroundImage="url('/groupGradient.svg')" backgroundSize="cover" backgroundRepeat="no-repeat" />
      <ModalContent borderRadius="24px">
        <ModalCloseButton mr='40px' mt='20px' />
        <ModalHeader> </ModalHeader>
        <ModalBody px="48px" pt='60px' pb="84px" >
         <Flex>
          <Flex direction="column" width="45%" gap='16px' alignItems='center'>
            <Flex direction="column" alignItems="center" mb='20px'>
              <Text fontSize="32px" fontWeight="500">Create an account</Text>
              <Text>Already have an account?<Text as="span" textDecor="underline">Login</Text></Text>
            </Flex>
            <Button variant="outline"  border='1px solid black' width="100%" maxWidth="320px" height="64px">
              <Flex alignItems='center' gap='10px'>
                <Image src="/google.svg" width="24" height="24" alt="illustation of a coffee cup" />
                <Text fontWeight="400">Continue with Google</Text>
              </Flex>
            </Button>
            <Button variant="outline"  border='1px solid black' width="100%" maxWidth="320px" height="64px">
              <Flex alignItems='center' gap='10px'>
                <Image src="/linkedinButton.svg" width="24" height="24" alt="illustation of a coffee cup" />
                <Text fontWeight="400">Continue with LinkedIn</Text>
              </Flex>      
            </Button>
          </Flex>
          <Box borderLeft="2px solid rgba(102, 102, 102, 0.25)" mx='40px'>
          </Box>
          <Flex direction="column" width="55%" alignItems='center' justifyContent='center' gap='10px'>
            <FormControl>
              <FormLabel color="#666666">Your email</FormLabel>
              <Input height="56px" />
            </FormControl>
            <FormControl>
              <FormLabel color="#666666">Password</FormLabel>
              <Input height="56px" />
            </FormControl>
            <Button width="100%" height="64px" mt='40px'>Create an account</Button>
          </Flex>
         </Flex>
        </ModalBody>

      </ModalContent>
     </Modal> */}
    </>
  )
}

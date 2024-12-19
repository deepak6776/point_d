"use client"

import { deleteBlog } from '@/app/(admin)/blogs/action';
import { Button, Modal, ModalOverlay, ModalBody, ModalContent,ModalFooter, Text, useDisclosure} from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function DeleteBlogModal({blogId}:{blogId: any}) {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const router = useRouter()

  const handleDelete = async() =>{
    // console.log('toolId from delete modal', toolId)
     await deleteBlog(blogId)
     router.push('/blogs')
  }

  return (
    <>
     
     <Button width="50%" mt='20px' colorScheme='red' onClick={onOpen}>Delete</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalBody>
            <Text textAlign='center'>Are you sure you want to delete?</Text>
          </ModalBody>
          <ModalFooter gap='20px' justifyContent='center'>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme='red' onClick={handleDelete} >Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

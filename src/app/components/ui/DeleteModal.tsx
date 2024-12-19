"use client"

import { deleteTool } from '@/app/(admin)/tools/actions';
import { Button, Modal, ModalOverlay, ModalBody, ModalContent,ModalFooter, Text, useDisclosure} from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function DeleteModal({toolId}:{toolId: any}) {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const router = useRouter()

  const handleDelete = async() =>{
    // console.log('toolId from delete modal', toolId)
     await deleteTool(toolId)
     router.push('/tools')
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

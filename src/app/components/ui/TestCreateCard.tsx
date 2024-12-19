"use client"
import { Flex, VStack, FormControl, FormLabel, Input, Text, Button} from '@chakra-ui/react'
import { Formik, Field } from 'formik'
import Link from 'next/link'

export default function TestCreateCard() {
  const handleSubmit = () =>{
    return
  }
  return (
    <Flex>
      <Formik
         initialValues={{email:"", password:""}}
         onSubmit={handleSubmit}
        >
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
            <VStack mt='20px'>
              <FormControl>
                <FormLabel htmlFor='email'>Title</FormLabel>
                <Field 
                  as={Input} 
                  name="title" 
                  id='title' 
                  type="text"  
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='password'>Category</FormLabel>
                <Field 
                  as={Input} 
                  name="category" 
                  id="category" 
                  type="text" 
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='password'>Model</FormLabel>
                <Field 
                  as={Input} 
                  name="model" 
                  id="model" 
                  type="text" 
                />
              </FormControl>
              <Button type='submit' width="100%" mt='20px'>Create</Button>
            </VStack>
          </form>
          )}
        </Formik>
    </Flex>
  )
}

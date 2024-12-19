
"use client"
import { Flex, VStack, FormControl, FormLabel, Input, Text, Button, Select} from '@chakra-ui/react'
import { Formik, Field } from 'formik'
import Link from 'next/link'
import ImageInput from './ImageInput'



export default function AffiliateCreateCard() {
  const handleSubmit = async () => {
    return
  }

  return (
    // <Flex width="50%" bgColor="gray.300">
      <Formik
         initialValues={{email:"", password:""}}
         onSubmit={handleSubmit}
        >
          {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
            <VStack mt='20px' width="50%">
              <ImageInput>
                Upload Product Image
              </ImageInput>
              <FormControl>
                <FormLabel htmlFor='title'>Title</FormLabel>
                <Field 
                  as={Input} 
                  name="title" 
                  id='title' 
                  type="text"  
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='description'>Description</FormLabel>
                <Field 
                  as={Input} 
                  name="description" 
                  id='description' 
                  type="text"  
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='description'>Affiliate Link</FormLabel>
                <Field 
                  as={Input} 
                  name="link" 
                  id='link' 
                  type="text"  
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='price'>Price</FormLabel>
                <Field 
                  as={Input} 
                  name="price" 
                  id='price' 
                  type="number"  
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='tag'>Tag</FormLabel>
                <Field 
                  as={Input} 
                  name="tag" 
                  id='tag' 
                  type="text"  
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='password'>Status</FormLabel>
                <Select>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </FormControl>
              <Button type='submit' width="100%" mt='20px'>Create</Button>
            </VStack>
          </form>
          )}
        </Formik>
    // {/* </Flex> */}
  )
}



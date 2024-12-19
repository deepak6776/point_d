"use client"
import AuthFormContainer from '@/app/components/AuthFormContainer'
import { filterFormikErrors } from '@/utils/formikHelpers'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, useToast, VStack } from '@chakra-ui/react'
import { Field, useFormik } from 'formik'
import Link from 'next/link'
import React from 'react'
// import { toast } from 'react-toastify'
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPasswordPage() {
  const toast = useToast();
  const {
    values,
    isSubmitting,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      const res = await fetch("/api/users/forgot-password", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const { message, error } = await res.json();

      if (res.ok) {
        toast({
          title:'Request to reset password',
          description: message,
          status:'success',
          duration:9000,
          isClosable: true
        })
      }

      if (!res.ok && error) {
        toast({
          title:'Something went wrong',
          description: error,
          status:'error',
          duration:9000,
          isClosable: true
        })
      }
      actions.setSubmitting(false);
    },
  });

  const errorsToRender = filterFormikErrors(errors, touched, values);

  type valueKeys = keyof typeof values;

  const { email } = values;

  return (
    <Flex className={`basePadding`} minHeight="100vh" alignItems="center" justifyContent="center">
      <Box width={{ base: '100%', sm: '80%', md: '50%', lg: '35%' }} p={{ base: '24px', md: '48px' }} rounded="lg" border="1px solid black">
        <Heading>Forgot Password</Heading>
        <AuthFormContainer onSubmit={handleSubmit}>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
            name="email"
            id="Email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}

          />
          { errors.email && touched.email ?<Text fontSize='12px' color="crimson">{errors.email}</Text> : ''}
          <Button type='submit' width="100%" mt='20px'>Submit</Button>
          <Link href='/'>
            <Text textDecoration="underline" mt='10px' textAlign='center'>Back to Home</Text>
          </Link>

        </AuthFormContainer>


      </Box>
    </Flex>
  )
}
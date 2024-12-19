"use client"
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, VStack, useToast } from '@chakra-ui/react'
import { ErrorMessage, Field, Formik, useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import Link from 'next/link'
import AuthFormContainer from '@/app/components/AuthFormContainer'
import { signIn } from 'next-auth/react'
import { filterFormikErrors } from '@/utils/formikHelpers'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'

type FormValues = {
  email: string,
  password: string
}

const signinSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function SignInPage() {

  const toast = useToast()
  const router = useRouter();

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched } = useFormik({
      initialValues:{email:'', password:''},
      validationSchema: signinSchema,
      onSubmit: async (values, actions) => {
        const signInRes = await signIn("credentials", {
          ...values,
          redirect: false,
        });

        console.log('from signin', signInRes)



        if (signInRes?.error === "Configuration") {
          toast({
            title:'Email password mismatch',
            description:'Please enter correct email and password',
            status:'error',
            duration:8000,
            isClosable:true
          })
        }

        if (!signInRes?.error) {
          router.refresh();
        }
      },

      
    })


    
  const formErrors: string[] = filterFormikErrors(errors, touched, values);
  type valueKeys = keyof typeof values;
  const { email, password } = values;
  const error = (name: valueKeys) => {
    return errors[name] && touched[name] ? true : false;
  };


  return (
    <Flex className={`basePadding`} minHeight="100vh" alignItems="center" justifyContent="center">
      <Box width={{base:'100%', sm:'80%', md:'50%', lg:'35%'}} p={{base:'24px', md:'48px'}} rounded="lg" border="1px solid black">
        <Heading>Sign In</Heading>

            <AuthFormContainer onSubmit={handleSubmit}>
              <VStack mt='20px'>
                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input
                   name="email"
                   id="email"
                   value={email}
                   onChange={handleChange}
                   onBlur={handleBlur}
                  />
                  { errors.email && touched.email ?<Text fontSize='12px' color="crimson">{errors.email}</Text> : ''}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input 
                   name="password"
                   id="password"
                   value={password}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   type="password"
                   errorBorderColor='crimson'
                  />
                  { errors.password && touched.password ?<Text fontSize='12px' color="crimson">{errors.password}</Text> : ''}
                </FormControl>
                <Button type='submit' width="100%" mt='20px'>Sign in</Button>
                <Link href='/auth/signup'>
                  <Text textDecoration="underline" mt='10px'>Sign Up</Text>
                </Link>
                <Link href='/auth/forgot-password'>
                  <Text textDecoration="underline" mt='10px'>Forgot Password</Text>
                </Link>
                <Link href='/'>
                  <Text textDecoration="underline" mt='10px'>Back to Home</Text>
                </Link>
              </VStack>
            </AuthFormContainer>      
      </Box>
    </Flex>
  )
}

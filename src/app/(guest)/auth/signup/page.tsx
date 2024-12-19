"use client"
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, VStack, useToast } from '@chakra-ui/react'
import Link from 'next/link'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { signIn } from 'next-auth/react'
import { filterFormikErrors } from '@/utils/formikHelpers'
import { useFormik, ErrorMessage } from 'formik'
import { toast } from 'react-toastify'
import AuthFormContainer from '@/app/components/AuthFormContainer'
import * as yup from 'yup'

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirm: string
}

const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters.")
    .required("Password is required!"),
  confirm: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref('password')], "Passwords don't match.")
});


export default function SignUpPage() {

  const toast = useToast()
  const {values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched, resetForm} = useFormik({
      initialValues:{name:'', email:'', password:'', confirm:''},
      validationSchema: signupSchema ,
      onSubmit: async (values, action) => {
        // console.log(values);
        action.setSubmitting(true);
        const res = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify(values),
        });

        const { message, error } = (await res.json()) as {
          message: string;
          error: string;
        };

        if (res.ok) {
          toast({
            title:'Account Created',
            description:"We have created an account for you",
            status:'success',
            duration:9000,
            isClosable: true
          })
          await signIn("credentials", { email, password });
          resetForm();
        }
  
        if (!res.ok && error) {
          toast({
            title:'Account creation unsuccessful',
            description:" Try different credentials",
            status:'error',
            duration:9000,
            isClosable: true

          })
          
        }
        action.setSubmitting(false);
      },

  });

 
  const {email, name, password, confirm} = values
  return (
    <Flex className={`basePadding`} minHeight="100vh" alignItems="center" justifyContent="center">
    <Box width={{base:'100%', sm:'80%', md:'50%', lg:'35%'}} p={{base:'24px', md:'48px'}} rounded="lg" border="1px solid black">
      <Heading>Sign Up</Heading>
          <AuthFormContainer onSubmit={handleSubmit}>
            <VStack mt='20px'>
              <FormControl>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input 
                 name="name"
                 id="name"
                 value={name}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 type='text'
                />
                { errors.name && touched.name ?<Text fontSize='12px' color="crimson">{errors.name}</Text> : ''}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input 
                 name="email"
                 id="email"
                 value={email}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 type='email'
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
                />
                { errors.password && touched.password ?<Text fontSize='12px' color="crimson">{errors.password}</Text> : ''}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='confirm'>Confirm Password</FormLabel>
                <Input 
                 name='confirm'
                 id="confirm"
                 value={confirm}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 type="password"
                />
                { errors.confirm && touched.confirm ?<Text fontSize='12px' color="crimson">{errors.confirm}</Text> : ''}
              </FormControl>
              <Button type='submit' width="100%" mt='20px'>Sign up</Button>
              <Link href='/'>
                <Text textDecoration="underline" mt='10px'>Back to Home</Text>
              </Link>
            </VStack>
          </AuthFormContainer>
    </Box>
  </Flex>
  )
}

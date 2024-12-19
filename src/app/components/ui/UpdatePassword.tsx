"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, useToast, VStack } from '@chakra-ui/react'
import { Field, Formik, useFormik, FormikProvider } from 'formik'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import * as yup from "yup";
import AuthFormContainer from "../AuthFormContainer";
import { filterFormikErrors } from "@/utils/formikHelpers";

const validationSchema = yup.object().shape({
    password1: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    password2: yup
        .string()
        .oneOf([yup.ref("password1")], "Passwords must match")
        .required("Confirm password is required"),
});

interface Props {
    userId: string;
    token: string;
}

export default function UpdatePassword({ token, userId }: Props) {
    const toast = useToast()
    const router = useRouter();
    const {
        values,
        isSubmitting,
        touched,
        errors,
        handleSubmit,
        handleBlur,
        handleChange,
    } = useFormik({
        initialValues: { password1: "", password2: "" },
        validationSchema,
        onSubmit: async (values, actions) => {
            const res = await fetch("/api/users/update-password", {
                method: "POST",
                body: JSON.stringify({ password: values.password1, token, userId }),
            });

            const { message, error } = await res.json();
            console.log(message)

            if (res.ok) {
                toast({
                    title:'Password reset',
                    description: message,
                    status:'success',
                    duration:9000,
                    isClosable: true
                  })
                router.replace("/auth/signin");
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
        },
    });

    const errorsToRender = filterFormikErrors(errors, touched, values);

    type valueKeys = keyof typeof values;

    const { password1, password2 } = values;
    const error = (name: valueKeys) => {
        return errors[name] && touched[name] ? true : false;
    };

    return (
        <AuthFormContainer onSubmit={handleSubmit}>
        <Flex className={`basePadding`} minHeight="100vh" alignItems="center" justifyContent="center">
            <Box width={{ base: '100%', sm: '80%', md: '50%', lg: '35%' }} p={{ base: '24px', md: '48px' }} rounded="lg" border="1px solid black">
                <Heading>Reset Password</Heading>
                <FormLabel htmlFor='password1'>Password</FormLabel>
                <Input
                    name="password1"
                    value={password1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                />
                { errors.password1 && touched.password1 ?<Text fontSize='12px' color="crimson">{errors.password1}</Text> : ''}
                <FormLabel htmlFor='password2'>Confirm Password</FormLabel>
                <Input
                    name="password2"

                    value={password2}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    type="password"
                />
                <Button type="submit" mt='20px' className="w-full" disabled={isSubmitting}>
                    Reset Password
                </Button>

            </Box>
        </Flex>
        </AuthFormContainer>
    );
}
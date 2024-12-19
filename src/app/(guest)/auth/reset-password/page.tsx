import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, VStack } from '@chakra-ui/react'
import { Field } from 'formik'
import Link from 'next/link'
import UpdatePassword from '@/app/components/ui/UpdatePassword';
import startDb from '@/lib/db';
import PasswordResetTokenModel from '@/models/passwordResetTokenModel';
import { redirect } from "next/navigation";
import React from "react";

interface Props {
    searchParams: {
        token: string;
        userId: string;
    };
}

const fetchTokenValidation = async (token: string, userId: string) => {
    await startDb();
    const resetToken = await PasswordResetTokenModel.findOne({ user: userId });
    if (!resetToken) return null;

    const matched = await resetToken.compareToken(token);
    if (!matched) return null;

    return true;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
    const { token, userId } = searchParams;

    if (!token || !userId) return redirect("/404");

    const isValid = await fetchTokenValidation(token, userId);
    if (!isValid) return redirect("/404");
    
    return <UpdatePassword token={token} userId={userId} />;
}
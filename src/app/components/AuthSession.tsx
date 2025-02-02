"use client"
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthSession({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
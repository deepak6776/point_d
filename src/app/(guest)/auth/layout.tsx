import React, { ReactNode } from 'react'
interface Props{
  children: ReactNode
}

export default function AuthLayout({children}:Props) {
  return (
    <div>{children}</div>
  )
}

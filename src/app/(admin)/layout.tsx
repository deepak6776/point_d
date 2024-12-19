import React, { ReactNode } from 'react'
import Sidebar from '../components/ui/Sidebar/Sidebar'
import { auth } from '../../../auth'
import { redirect } from 'next/navigation'


interface Props {
  children: ReactNode
}

export default async function AdminLayout({children}:Props) {

  const session = await auth();
  const user = session?.user;
  const isAdmin = user?.role === "admin"

  if(!isAdmin) return redirect("/auth/signin")


  return (
    <>
    <Sidebar />
     {children}
    </>
  )
}

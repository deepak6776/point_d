"use client"

import { ColumnDef } from "@tanstack/react-table"

import Link from "next/link"
import { IconButton, Text } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import { BlogInterface } from "./page"

export const columns: ColumnDef<BlogInterface>[] = [
  {
    accessorKey: "title",
    header: "Title"
  },
  {
    accessorKey: "category",
    header: "Category"
  },
  {
    accessorKey: "status",
    header: "Status"
  },
  {
    accessorKey: "author",
    header: "Author"
  },
  {
    accessorKey:"thumbnail",
    header: "Thumbnail",
    cell: props => (
      <img 
       src={props.row.original.thumbnail}
       width={60}
       alt='thumbnail image'
      />
    )
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: props => (
      <Link href={`/blogs/update/${props.row.original.id}`}>
       <IconButton bgColor="white" aria-label="edit" icon={<EditIcon/>} />
      </Link>
    )
  },
]
"use client"

import { ColumnDef } from "@tanstack/react-table"

import Link from "next/link"
import { IconButton, Text } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import { ToolCategoryInterface } from "./page"


export const columns: ColumnDef<ToolCategoryInterface>[] = [
  {
    accessorKey: "title",
    header: "Title"
  },
  {
    accessorKey: "description",
    header: "Description"
  },
  {
    accessorKey: "slug",
    header: "Slug"
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
      <Link href={`/tool-category/update/${props.row.original.id}`}>
       <IconButton bgColor="white" aria-label="edit" icon={<EditIcon/>} />
      </Link>
    )
  },
]
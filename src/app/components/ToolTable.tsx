'use client'
import { EditIcon } from "@chakra-ui/icons"
import { Button, Flex, IconButton, Skeleton, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export interface Tool {
  id: string;
  title: string;
  thumbnail?:string;
  description: string;
  category: string;
  link: string;
  status: string;
  author:string
}

interface Props{
  items:Tool[],
  currentPageNo: number
  hasMore: boolean
}

export default function ToolTable({items, currentPageNo, hasMore}:Props) {
  const [isLoaded, setIsLoaded] = useState(true)
  const router = useRouter();


  const handlePrevPress = () =>{
    const prevPage = currentPageNo - 1;
    if (prevPage > 0) router.push(`/tools?page=${prevPage}`)
  }

  const handleNextPress = () => {
    const nextPage = currentPageNo + 1;
    router.push(`/tools?page=${nextPage}`)
  }



  return (
    <TableContainer >
        <Table>
          <Thead>
            <Tr fontWeight="500" bgColor="gray.200">
              {/* <Th>S.No</Th> */}
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Thumbnail</Th>
              <Th>Link</Th>
              <Th>Status</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item)=> {
              return <Tr mb='5px' key={item.id}>
                      {/* <Td>
                        <Skeleton isLoaded={isLoaded}>{item.id}</Skeleton>
                      </Td> */}
                      <Td>
                        <Skeleton isLoaded={isLoaded}>{item.title}</Skeleton>
                      </Td>
                      <Td>
                        <Skeleton isLoaded={isLoaded}>{item.category}</Skeleton>
                      </Td>
                      <Td>
                        <Skeleton isLoaded={isLoaded}>
                          <Image src={item.thumbnail|| ""} width='60' height='40' alt='thumbnail' />
                        </Skeleton>
                      </Td>
                      <Td>
                        <Skeleton isLoaded={isLoaded}>{item.link}</Skeleton>
                      </Td>
                      <Td>
                        <Skeleton isLoaded={isLoaded}>{item.status}</Skeleton>
                      </Td>
                      <Td>
                        <Skeleton isLoaded={isLoaded}>
                          <Link href={`/tools/update/${item.id}`}>
                            <IconButton bgColor="white" aria-label="edit" icon={<EditIcon/>} />
                          </Link>
                        </Skeleton>
                      </Td>
                </Tr>
            })}
          </Tbody>
        </Table>
        <Flex gap='20px' mt='20px' justifyContent='center'>
          <Button 
            isDisabled={currentPageNo == 1} 
            onClick={handlePrevPress}
          >
            Previous
          </Button>
          <Button
            isDisabled={!hasMore}
            onClick={handleNextPress}
          >
            Next
          </Button>
        </Flex>
      </TableContainer>
  )
}

'use client'
import { Button, Flex, Skeleton, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import Link from "next/link"
import { useState } from "react"

export default function Sources() {
 const items = [
    {title:"Atlassian Design System", category:"Design Guidelines", model:"free"},
    {title:"Ant Design System", category:"Design Guidelines", model:"free"},
    {title:"Fluid Design System", category:"Design Guidelines", model:"free"},
    {title:"Apple Design System", category:"Design Guidelines", model:"free"}
  ]

  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Flex height='100vh' width="80%" ml='auto' p='32px' direction="column" gap="20px">
      <Flex width="100%" height="max-content" alignItems="center">
        <Text mr="auto">Sources</Text>
        <Link href="sources/create">
         <Button>Add Item</Button>
        </Link>
      </Flex>
      <TableContainer >
        <Table>
          <Thead>
            <Tr fontWeight="500" bgColor="gray.200">
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Model</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item)=> {
              return <Tr mb='5px' key={item.title}>
                      <Td>
                        <Skeleton isLoaded={isLoaded}>{item.title}</Skeleton>
                      </Td>
                      <Td>
                        <Skeleton isLoaded={isLoaded}>{item.category}</Skeleton>
                      </Td>
                      <Td>
                        <Skeleton isLoaded={isLoaded}>{item.model}</Skeleton>
                      </Td>
                </Tr>
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button onClick={() => setIsLoaded((value)=> !value )}>Toggle Loading State</Button>
    </Flex>
  )
}

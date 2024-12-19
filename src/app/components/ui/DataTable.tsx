"use client"
import { Button, Flex, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useStatStyles } from "@chakra-ui/react"
import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { useState } from "react"

interface DataTableProps<TData, TValue>{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  categories:string[],
  filterDisplay:string,

}

export default function DataTable<TData, TValue>({columns, data, categories, filterDisplay}:DataTableProps<TData, TValue>) {
  
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex:0,
    pageSize:10,
  })
  
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel:getPaginationRowModel(),
    onPaginationChange: setPagination,
    state:{
      columnFilters,
      pagination
    }
  })


  return (
    <TableContainer>
      <Flex mb='20px' width="50%" gap='20px' alignItems='center'>
        <Flex direction="column">
          <Text fontSize='14px' ml='5px' mb='5px'>Search by title</Text>
          <Input
           
           value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
           onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
           }
          
          />
        </Flex>
        <Flex direction="column" display={filterDisplay}>
          <Text fontSize='14px' ml='5px' mb='5px'>Filter by category</Text>
          <Select
            id="category"
            value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
            placeholder='All'
            onChange={(event) =>
              table.getColumn("category")?.setFilterValue(event.target.value)
             }
             >
                {categories.map((c) => (
                    <option value={c} key={c}>
                        {c}
                    </option>
                  ))}
            </Select>
        </Flex>
        <Flex direction="column" display={filterDisplay} >
          <Text fontSize='14px' ml='5px' mb='5px'>Filter by status</Text>
          <Select
            id="status"
            value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
            placeholder='All'
            onChange={(event) =>
              table.getColumn("status")?.setFilterValue(event.target.value)
             }
             >
               <option value='draft'>Draft</option>
               <option value='published'>Published</option>
            </Select>
        </Flex>
      </Flex>
      <Table>
        <Thead >
         {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id} bgColor="gray.200">
            {headerGroup.headers.map((header) => {
              return(
                <Th key={header.id} fontFamily='urw-form' fontSize='16px'>
                  {header.isPlaceholder 
                    ? null 
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </Th>
              )
            })}
          </Tr>
         ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
             <Tr 
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) =>(
                  <Td key={cell.id} maxW='300px' overflowX='auto' py='10px'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
             </Tr>
            ))
           ):(
              <Tr>
                <Td colSpan={columns.length}> No results</Td>
              </Tr>
            )}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={columns.length} border='none'>
              <Flex mt='10px' gap='10px' alignItems='center'>
                <Button
                 onClick={() => table.firstPage()}
                 isDisabled={!table.getCanPreviousPage()}
                >
                  {'<<'}
                </Button>
                <Button
                 onClick={() => table.previousPage()}
                 isDisabled={!table.getCanPreviousPage()}
                >
                  {'<'}
                </Button>
                <Button
                 onClick={() => table.nextPage()}
                 isDisabled={!table.getCanNextPage()}
                >
                  {'>'}
                </Button>
                <Button
                 onClick={() => table.lastPage()}
                 isDisabled={!table.getCanNextPage()}
                >
                  {'>>'}
                </Button>
                <Text>{table.getState().pagination.pageIndex + 1} / {table.getPageCount().toString()}</Text>
                <Flex alignItems='center' ml='auto' gap='8px'>
                  <Text>Go to page:</Text>
                  <NumberInput width='100px' min={1} max={table.getPageCount()}>
                    <NumberInputField
                     onChange={(e) =>{
                      const page = e.target.value ? Number(e.target.value) - 1 : 0
                      table.setPageIndex(page)
                     }}
                    />
                  </NumberInput>
              </Flex>
              </Flex>
            </Td>
          </Tr> 
          
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

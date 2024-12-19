"use client"
import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import React, { useState} from 'react'
import categories from '@/utils/categories'

export default function CategoryFilter() {
  const [category, setCategory] = useState('')
  console.log('category from filter', category)
  return (
    <FormControl width='30%' mr='20px'>
                  <Select
                        id="category"
                        value={category}
                        placeholder="Select a category"
                        onChange={({ target }) =>
                            setCategory(target.value)
                        }
                    >
                        {categories.map((c) => (
                            <option value={c} key={c}>
                                {c}
                            </option>
                        ))}
                    </Select>
                </FormControl>
  )
}

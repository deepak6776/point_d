"use client"
import { Flex, SimpleGrid, Box, Text, Button, Input} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import MobileScreen from '../components/ui/MobileScreen/MobileScreen'

let dummyData = [
    {
        id: 1,
        app:'Dots',
        tags:['motion', 'pinch']
    },
    {
        id: 2,
        app:'Asana',
        tags:['transition', 'loading','morph']
    },
    {
        id: 3,
        app:'ChatGPT',
        tags:['signup', 'onboarding']
    },
    {
        id: 4,
        app:'Lapse',
        tags:['float', 'pinch']
    },
    {
        id: 5,
        app:'Amie',
        tags:['motion', 'refresh']
    },
    {
        id: 6,
        app:'Spotify',
        tags:['ripple', 'transition', 'morph']
    },
    {
        id: 7,
        app:'Wise',
        tags:['signup', 'transition']
    },
    {
        id: 8,
        app:'Twodos',
        tags:['motion', 'pinch']
    },
]

export default function Motion() {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const [filteredItems, setFilteredItems] = useState([...dummyData])

    let filterTags = ['motion', 'pinch', 'signup', 'transition', 'ripple', 'morph', 'refresh','onboarding', 'float', 'loading' ]

    const handleFilterClick = (selectedTag:string) =>{
      if(selectedFilters.includes(selectedTag)){
        let filters = selectedFilters.filter((item)=> item !== selectedTag)
        setSelectedFilters(filters)
      }else{
        setSelectedFilters([...selectedFilters, selectedTag])
      }
    }

    const filterItems = () =>{
        if(selectedFilters.length > 0){
            let tempItems = selectedFilters.map((filterItem)=>{

                let temp = dummyData.filter((item) => item.tags.includes(filterItem))

                return temp

            }) ;

            setFilteredItems(tempItems.flat())
        } else{
            setFilteredItems([...dummyData])
        }
         
    }


    useEffect(() => {
        filterItems()
    },[selectedFilters])

  return (
    <Flex  direction='column'>
        <Flex mb='20px' width='50%' mx='auto' alignItems='center'>
            <Input 
               placeholder="Search"
               onChange={(e)=> {
                let tempfilter = dummyData.filter((item) => (item.tags.includes(e.target.value) || item.app.includes(e.target.value)))
                setFilteredItems([...tempfilter])
            }} />
        </Flex>
        <Flex gap='10px' alignItems='center' justifyContent='center' flexWrap="wrap">
            {filterTags.map((filter, id)=>(
                <Button 
                    key={`filter=${id}`}
                    className={`${selectedFilters.includes(filter)? 'filterPillActive': ''}`}
                    onClick={()=> handleFilterClick(filter)}
                >   
                    {filter}
                </Button>
            ))}
        </Flex>

        <SimpleGrid columns={{base:1, md:2, lg:3, xl:4}} gap='42px' mt='60px' >
            {filteredItems.map((item)=>(
               <Box key={item.id}>
                   <MobileScreen app={item.app} tags={item.tags} />
               </Box>
            ))}
        </SimpleGrid>
    </Flex>
  )
}

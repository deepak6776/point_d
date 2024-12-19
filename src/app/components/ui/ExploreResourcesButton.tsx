"use client"
import { Button } from '@chakra-ui/react';


export default function ExploreResourcesButton() {
  return (
    <Button
      className={`btn`}
      onClick={(e)=>{
                e.preventDefault();
               document.getElementById('resources')?.scrollIntoView({behavior:'smooth'})
              }}
    >
      Explore Resources
    </Button>
    
  )
}

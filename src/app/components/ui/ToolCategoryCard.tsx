
import ImageSelector from '@/app/components/ui/ImageSelector'
import { NewToolCategoryInfo } from '@/types'
import { Button, Flex, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react'
import React, { ChangeEventHandler, useEffect, useState, useTransition } from 'react'

const defaultValue = {
  title: "",
  description: "",
  slug: ""
}

export interface InitialValue{
  title: string,
  description: string,
  slug: string,
  thumbnail: string

}

interface Props{
  initialValue?: InitialValue,
  onSubmit(values:NewToolCategoryInfo):void,
  onImageRemove?(source:string):void
}





export default function ToolCategoryCard(props:Props) {
  const {onImageRemove, onSubmit, initialValue} = props

  const [isPending, startTransition] = useTransition();
  const [toolCategory, setToolCategory] = useState({ ...defaultValue });
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [thumbnail, setThumbnail] = useState<File>();
  const [thumbnailSource, setThumbnailSource] = useState<string[]>()




  const removeImage = async(index: number) => {
    if(!thumbnailSource) return
  
    const imageToRemove = thumbnailSource;
    const cloudSourceUrl = "https://res.cloudinary.com";
    console.log('from remove image in tool create', imageToRemove[0])
    if(imageToRemove[0].startsWith(cloudSourceUrl)){
      console.log('image to remove', imageToRemove[0])
      onImageRemove && onImageRemove(imageToRemove[0])
    }else{
      setThumbnailSource([]);
    }
  }
  
  const onThumbnailChange: ChangeEventHandler<HTMLInputElement> = ({target}) => {
    const files = target.files
    if(files){
      const file = files[0]
      setThumbnail(file)
      setThumbnailSource([URL.createObjectURL(file)]);
    }
  }

  const getBtnTitle = () => {
    if (isForUpdate) return isPending ? "Updating" : "Update";
    return isPending ? "Creating" : "Create";
  };

  useEffect(() => {
    if (initialValue) {
        setToolCategory({ ...initialValue });
        setThumbnailSource([initialValue.thumbnail]);
        setIsForUpdate(true);
    }
  }, []); 
  
  return (
    <form action={ () => 
      startTransition( () => {
        console.log('from tool category create', toolCategory)
        onSubmit({ ...toolCategory, thumbnail });
      })}
  >
   

    <VStack mt='20px' width="50%">
      <ImageSelector
       id='toolcategory'
       images={thumbnailSource}
       onChange={onThumbnailChange}
       onRemove={removeImage}
      
      />
    <FormControl>
      <FormLabel htmlFor='title'>Title</FormLabel>
      <Input
       type='text'
       name='title'
       id='title'
       value={toolCategory.title}       
       onChange={({target})=>{
                setToolCategory({...toolCategory, title: target.value})
                }}
      />
    </FormControl> 
    <FormControl>
      <FormLabel htmlFor='slug'>Slug</FormLabel>
      <Input
       type='text'
       name='slug'
       id='slug'
       value={toolCategory.slug}       
       onChange={({target})=>{
                setToolCategory({...toolCategory, slug: target.value})
                }}
      />
    </FormControl> 
    <FormControl>
      <FormLabel htmlFor='description'>Description</FormLabel>
      <Input
       type='text'
       name='description'
       id='description'
       value={toolCategory.description}       
       onChange={({target})=>{
                setToolCategory({...toolCategory, description: target.value})
                }}
      />
    </FormControl> 
    <Button type='submit' width="100%" mt='20px'>{getBtnTitle()}</Button>

    </VStack>
   </form>
  )
}

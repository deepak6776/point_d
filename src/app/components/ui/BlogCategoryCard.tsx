
import ImageSelector from '@/app/components/ui/ImageSelector'
import { NewBlogCategoryInfo } from '@/types'
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
  onSubmit(values:NewBlogCategoryInfo):void,
  onImageRemove?(source:string):void
}





export default function BlogCategoryCard(props:Props) {
  const {onImageRemove, onSubmit, initialValue} = props

  const [isPending, startTransition] = useTransition();
  const [blogCategory, setBlogCategory] = useState({ ...defaultValue });
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
        setBlogCategory({ ...initialValue });
        setThumbnailSource([initialValue.thumbnail]);
        setIsForUpdate(true);
    }
  }, []); 
  
  return (
    <form action={ () => 
      startTransition( () => {
        console.log('from blog category create', blogCategory)
        onSubmit({ ...blogCategory, thumbnail });
      })}
  >
    <VStack mt='20px' width="50%">
      <ImageSelector
       id='blogcategory'
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
       value={blogCategory.title}       
       onChange={({target})=>{
                setBlogCategory({...blogCategory, title: target.value})
                }}
      />
    </FormControl> 
    <FormControl>
      <FormLabel htmlFor='slug'>Slug</FormLabel>
      <Input
       type='text'
       name='slug'
       id='slug'
       value={blogCategory.slug}       
       onChange={({target})=>{
                setBlogCategory({...blogCategory, slug: target.value})
                }}
      />
    </FormControl> 
    <FormControl>
      <FormLabel htmlFor='description'>Description</FormLabel>
      <Input
       type='text'
       name='description'
       id='description'
       value={blogCategory.description}       
       onChange={({target})=>{
                setBlogCategory({...blogCategory, description: target.value})
                }}
      />
    </FormControl> 
    <Button type='submit' width="100%" mt='20px'>{getBtnTitle()}</Button>

    </VStack>
    
  
   </form>
  )
}

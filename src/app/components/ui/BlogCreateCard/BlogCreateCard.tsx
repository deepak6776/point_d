
import { NewBlogInfo} from '@/types';
import React, { ChangeEventHandler, useEffect, useState, useTransition } from 'react'
import ImageSelector from '../ImageSelector';
import { Button, FormControl, FormLabel, Input, Select, Textarea, VStack } from '@chakra-ui/react';
import TextEditor from '../TextEditor/TextEditor';
import TurndownService from "turndown"

const defaultValue = {
    title: "",
    description:'',
    author: "",
    category: "",
    body: "",
    status:""
  };

 interface Props {
    initialValue?: InitialValue;
    onSubmit(values: NewBlogInfo):void
    onImageRemove?(source: string):void
    categories?:string[]
  }

  export interface InitialValue{
    title: string;
    description:string;
    thumbnail: string;
    author: string
    category: string;
    body: string;
    status: string;
  }

export default function BlogCreateCard(props:Props) {
    const {onImageRemove, onSubmit, initialValue, categories} = props
    const [isPending, startTransition] = useTransition();
    const [blogInfo, setBlogInfo] = useState({ ...defaultValue });
    const [isForUpdate, setIsForUpdate] = useState(false);
    const [thumbnail, setThumbnail] = useState<File>();
    const [thumbnailSource, setThumbnailSource] = useState<string[]>()
    
    console.count('blog create card ')
    
    console.log('fetched categories from blog create card', categories)

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
      console.log('initial value', initialValue)
      if (initialValue) {
          setBlogInfo({ ...initialValue });
          setThumbnailSource([initialValue.thumbnail]);
          setIsForUpdate(true);
      }
    }, []); 
  


  return (
    <form action={ () => 
        startTransition( () => {
          console.log('from blog create card', blogInfo)
          onSubmit({ ...blogInfo, thumbnail });
        })}
    >
        <VStack mt='20px' width="50%">
            <ImageSelector
                id='1'
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
              value={blogInfo.title}
              onChange={({target})=>{
                setBlogInfo({...blogInfo, title: target.value})
              }}
              />
            </FormControl> 
           <FormControl>
             <FormLabel htmlFor='description'>Description</FormLabel>
             <Input
              type='text'
              name='description'
              id='description'
              value={blogInfo.description}
              onChange={({target})=>{
                setBlogInfo({...blogInfo, description: target.value})
              }}
              />
            </FormControl> 
           <FormControl>
             <FormLabel htmlFor='author'>Author</FormLabel>
             <Input
              type='text'
              name='author'
              id='author'
              value={blogInfo.author}
              onChange={({target})=>{
                setBlogInfo({...blogInfo, author: target.value})
              }}
              />
            </FormControl> 
           <FormControl>
             <FormLabel htmlFor='blogcategory'>Category</FormLabel>
             <Select
                        id="blogcategory"
                        value={blogInfo.category}
                        placeholder='Select a category'
                        onChange={({ target }) =>
                            setBlogInfo({ ...blogInfo, category: target.value })
                        }
                    >
                        {categories?.map((c) => (
                            <option value={c} key={c}>
                                {c}
                            </option>
                        ))}
                    </Select>
            </FormControl> 
           <FormControl>
             <FormLabel htmlFor='body'>Body</FormLabel>
             {/* <Textarea 
              name='body'
              id='body'
              value={blogInfo.body}
              onChange={({target})=>{
                setBlogInfo({...blogInfo, body: target.value})
              }}

             /> */}
             <TextEditor setText={setBlogInfo} blogInfo={blogInfo} />

            </FormControl>
            <FormControl>
                  <FormLabel htmlFor='status'>Status</FormLabel>
                  <Select
                        id="status"
                        placeholder="Select a status"
                        value={props.initialValue?.status}
                        onChange={({ target }) =>
                            setBlogInfo({ ...blogInfo, status: target.value })
                        }
                    >
                        <option value='draft'>Draft</option>
                        <option value='published'>Published</option>
                    </Select>
            </FormControl>
            <Button type='submit' width="100%" mt='20px'>{getBtnTitle()}</Button> 
        </VStack>

    </form>
  )
}

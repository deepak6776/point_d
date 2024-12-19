'use client'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from '@tiptap/starter-kit'
import styles from './texteditor.module.css'
import { Box, Button, Flex, Tooltip } from "@chakra-ui/react"
import { Bold, Italic, TextQuote, ListOrdered, List, FileImage} from "lucide-react"
import { ChangeEventHandler, useEffect, useState } from "react"
import Image from "@tiptap/extension-image"
import ImageInput from "../ImageInput"
import { uploadImage } from "@/utils/helper"






export default function TextEditor({setText, blogInfo}:{setText:Function, blogInfo:any}) {
     
    
    // const [blogBody, setBlogBody] = useState('')


    const editor = useEditor({
        editorProps:{
            attributes:{
                class:`${styles.textEditor}`
            }
        }, 
        enableInputRules: false,
        immediatelyRender: false,
        extensions: [StarterKit, Image],
        content: '' ,
        onUpdate({editor}){ 
           setText({...blogInfo, body:editor.getHTML()})
        }
    })



  
    useEffect(()=>{

         if(editor){
            editor?.commands.setContent(blogInfo.body)
         }   
      },[blogInfo.body, editor])


    const blogImageUpload : ChangeEventHandler<HTMLInputElement> = async ({target}) =>{
       const files = target.files
       if(files){
        const file = files[0]
        const blogImage = await uploadImage(file)
        editor?.commands.insertContent(`<img src=${blogImage.url} />`)
       }
    }  
   
    


    



  return (
    <Box id='body' key='body'>
      <Flex gap='5px' mb='10px' >
        <Tooltip label='bold'>
            <Button
             onClick={()=>{
                editor?.chain().focus().toggleBold().run()
             }}
             className={`${editor?.isActive("bold")? styles.isActive : ""} ${styles.customButton}`}
             >
                <Bold size={14} strokeWidth={3} />
            </Button>
        </Tooltip>
        <Tooltip label='italic'>
            <Button
             onClick={()=>{
                editor?.chain().focus().toggleItalic().run()
             }}
             className={`${editor?.isActive("italic")? styles.isActive : ""} ${styles.customButton}`}
            >
                <Italic size={14} strokeWidth={3} />
            
            </Button>
        </Tooltip>
        <Tooltip label='blockquote'>
            <Button
             onClick={()=>{
                editor?.chain().focus().toggleBlockquote().run()
             }}
             className={`${editor?.isActive("blockquote")? styles.isActive : ""} ${styles.customButton}`}
            >
                <TextQuote size={14} strokeWidth={3} />
            </Button>
        </Tooltip>
        <Tooltip label='ordered list'>
            <Button
             onClick={()=>{
                editor?.chain().focus().toggleOrderedList().run()
             }}
             className={`${editor?.isActive("orderedList")? styles.isActive : ""} ${styles.customButton}`}
            >
                <ListOrdered size={18} strokeWidth={2} />
            </Button>
        </Tooltip>
        <Tooltip label="unordered list">
            <Button
             onClick={()=>{
                editor?.chain().focus().toggleBulletList().run()
             }}
             className={`${editor?.isActive("bulletList")? styles.isActive : ""} ${styles.customButton}`}
            >
                <List size={18} strokeWidth={2} />
            </Button>
        </Tooltip>
        <Button 
            onClick={() => {
                editor?.commands.insertContent(`<img src="https://res.cloudinary.com/dpzrbvtdx/image/upload/v1730797347/npgstf9jtpayxl0l6xay.webp" />`)
            }}
            className={`${styles.customButton}`}>
           <FileImage size={18} strokeWidth={2} />
        </Button>
        <ImageInput onChange={blogImageUpload} >
            <FileImage />
        </ImageInput>
       </Flex>
       <EditorContent 
            className={styles.texteditor} 
            editor={editor} 
            id='body'
        />
    </Box>
    
  )
}

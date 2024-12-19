import { z } from "zod"

export const signinSchema = z.object({
  email: z.string({
    required_error:"Email is required"
  }).email(),
  password: z.string({
    required_error:'Password required'
  }).min(8,{message:'Password must be 8 or more characters long'})
})


export const signupSchema = z.object({
  name:z.string({
    required_error:'Name is required'
  }),
  email: z.string({
    required_error:"Email is required"
  }).email(),
  password: z.string({
    required_error:'Password required'
  }).min(8,{message:'Password must be 8 or more characters long'}),
  confirm: z.string({
    required_error:'Password required'
  }).min(8,{message:'Password must be 8 or more characters long'})
}).refine((data) => data.password === data.confirm, {
  message:'Passwords do not match',
  path:["confirm"]
})


export const blogSchema = z.object({
  title:z.string({required_error:'title is required'}),
  description:z.string({required_error:'description is required'}),
  link:z.string({required_error:'link is required'}),
  category:z.string({required_error:'category is required'}),
  status:z.string({required_error:'status is required'}),
  pricing:z.string({required_error:'pricing is required'}),
})

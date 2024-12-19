"use server"

import startDb from "@/lib/db";
import BlogModel, { NewBlog } from "@/models/blogModel";
import { BlogToUpdate } from "@/types";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});

export const getCloudConfig = async () => {
    return {
        name: process.env.CLOUD_NAME!,
        key: process.env.CLOUD_API_KEY!,
    };
};

// generate our cloud signature
export const getCloudSignature = async () => {
    const secret = cloudinary.config().api_secret!;
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request({ timestamp }, secret);

    return { timestamp, signature };
};

export const createProduct = async (info: NewBlog) => {
    try {
      await startDb();
      await BlogModel.create({ ...info });
    } catch (error) {
      console.log((error as any).message);
      throw new Error("Something went wrong, can not create product!");
    }
  };

  export const removeImageFromCloud = async (publicId: string) => {
    await cloudinary.uploader.destroy(publicId);
  };
  
  export const removeAndUpdateBlogImage = async (
    id: string,
    publicId: string
  ) => {
    try {
      const { result } = await cloudinary.uploader.destroy(publicId);
  
      if (result === "ok") {
        console.log('inside removeAndUpdateBlogImage')
        await startDb();
        await BlogModel.findByIdAndUpdate(id, {
          $pull: { thumbnail: { id: publicId } },
        });
      }
    } catch (error) {
      console.log(
        "Error while removing image from cloud: ",
        (error as any).message
      );
      throw error;
    }
  };
  
  export const updateBlog = async (
    id: string,
    blogInfo: BlogToUpdate
  ) => {
    try {
      await startDb();
      let images: typeof blogInfo.thumbnail ;
      if (blogInfo.thumbnail) {
        images = blogInfo.thumbnail;
      }
  
      // delete blogInfo.thumbnail;
      await BlogModel.findByIdAndUpdate(id, {
        ...blogInfo,
      });
    } catch (error) {
      console.log("Error while updating product, ", (error as any).message);
      throw error;
    }
  };


  export const updateImage = async (id: string) => {
    try{
      await startDb()
      let blog = await BlogModel.findById(id)
      console.log('blog from update Image', blog)
      if(blog){
        //@ts-ignore
        await removeImageFromCloud(blog.thumbnail.id)
      }
    }catch(error){
      console.log("Error while removing image from cloud product, ", (error as any).message);
       throw error;
    } 
  }

  export const deleteBlog = async (id: string) => {
    try{
      await startDb()
      let blog = await BlogModel.findById(id)
      console.log('blog from delete blog', blog)
      if(blog){
        //@ts-ignore
        await removeImageFromCloud(blog.thumbnail.id)
      }
      await BlogModel.findByIdAndDelete(id)

    }catch(error){
      console.log("Error while deleting blog, ", (error as any).message);
       throw error;
    } 
  }
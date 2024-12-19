'use server'
import startDb from "@/lib/db";
import BlogCategoryModel, { NewBlogCategory } from "@/models/blogCategoryModel";
import { BlogCategoryToUpdate } from "@/types";
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

export const createBlogCategory = async (info: NewBlogCategory) => {
    try {

      await startDb();
      await BlogCategoryModel.create({ ...info });

    } catch (error) {
      console.log((error as any).message);
      throw new Error("Something went wrong, can not create product!");
    }
  };

  export const removeImageFromCloud = async (publicId: string) => {
    await cloudinary.uploader.destroy(publicId);
  };

  export const removeAndUpdateBlogCategoryImage = async (
    id: string,
    publicId: string
  ) => {
    try {
      const { result } = await cloudinary.uploader.destroy(publicId);
  
      if (result === "ok") {
        console.log('inside removeAndUpdateBlogImage')
        await startDb();
        await BlogCategoryModel.findByIdAndUpdate(id, {
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

  export const updateBlogCategory = async (
    id: string,
    blogInfo: BlogCategoryToUpdate
  ) => {
    try {
      await startDb();
      let images: typeof blogInfo.thumbnail ;
      if (blogInfo.thumbnail) {
        images = blogInfo.thumbnail;
      }
  
      // delete blogInfo.thumbnail;
      await BlogCategoryModel.findByIdAndUpdate(id, {
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
      let blog = await BlogCategoryModel.findById(id)
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

  export const deleteBlogCategory = async (id: string) => {
    try{
      await startDb()
      let blog = await BlogCategoryModel.findById(id)
      console.log('blog from delete blog', blog)
      if(blog){
        //@ts-ignore
        await removeImageFromCloud(blog.thumbnail.id)
      }
      await BlogCategoryModel.findByIdAndDelete(id)

    }catch(error){
      console.log("Error while deleting blog, ", (error as any).message);
       throw error;
    } 
  }
'use server'
import startDb from "@/lib/db";
import ToolCategoryModel, { NewToolCategory } from "@/models/toolCategoryModel";
import { ToolCategoryToUpdate } from "@/types";
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

export const createToolCategory = async (info: NewToolCategory) => {
    try {

      await startDb();
      await ToolCategoryModel.create({ ...info });

    } catch (error) {
      console.log((error as any).message);
      throw new Error("Something went wrong, can not create product!");
    }
  };

  export const removeImageFromCloud = async (publicId: string) => {
    await cloudinary.uploader.destroy(publicId);
  };

  export const removeAndUpdateToolCategoryImage = async (
    id: string,
    publicId: string
  ) => {
    try {
      const { result } = await cloudinary.uploader.destroy(publicId);
  
      if (result === "ok") {
        console.log('inside removeAndUpdateToolImage')
        await startDb();
        await ToolCategoryModel.findByIdAndUpdate(id, {
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

  export const updateImage = async (id: string) => {
    try{
      await startDb()
      let tool = await ToolCategoryModel.findById(id)
      console.log('tool from update Image', tool)
      if(tool){
        //@ts-ignore
        await removeImageFromCloud(tool.thumbnail.id)
      }
    }catch(error){
      console.log("Error while removing image from cloud product, ", (error as any).message);
       throw error;
    } 
  }

  export const updateToolCategory = async (
    id: string,
    toolInfo: ToolCategoryToUpdate
  ) => {
    try {
      await startDb();
      let images: typeof toolInfo.thumbnail ;
      if (toolInfo.thumbnail) {
        images = toolInfo.thumbnail;
      }
  
      // delete toolInfo.thumbnail;
      await ToolCategoryModel.findByIdAndUpdate(id, {
        ...toolInfo,
      });
    } catch (error) {
      console.log("Error while updating product, ", (error as any).message);
      throw error;
    }
  };

  export const deleteToolCategory = async (id: string) => {
    try{
      await startDb()
      let tool = await ToolCategoryModel.findById(id)
      console.log('tool from delete tool', tool)
      if(tool){
        //@ts-ignore
        await removeImageFromCloud(tool.thumbnail.id)
      }
      await ToolCategoryModel.findByIdAndDelete(id)

    }catch(error){
      console.log("Error while deleting blog, ", (error as any).message);
       throw error;
    } 
  }
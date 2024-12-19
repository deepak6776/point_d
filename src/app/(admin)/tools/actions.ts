"use server"

import startDb from "@/lib/db";
import ToolModel, { NewTool } from "@/models/toolModel";
import { ToolToUpdate } from "@/types";
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

export const createProduct = async (info: NewTool) => {
    try {
      await startDb();
      await ToolModel.create({ ...info });
    } catch (error) {
      console.log((error as any).message);
      throw new Error("Something went wrong, can not create product!");
    }
  };

  export const removeImageFromCloud = async (publicId: string) => {
    await cloudinary.uploader.destroy(publicId);
  };
  
  export const removeAndUpdateToolImage = async (
    id: string,
    publicId: string
  ) => {
    try {
      const { result } = await cloudinary.uploader.destroy(publicId);
       console.log('result from update', result)
      if (result === "ok") {
        await startDb();
        await ToolModel.findByIdAndUpdate(id, {
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
  
  export const updateTool = async (
    id: string,
    toolInfo: ToolToUpdate
  ) => {
    try {
      await startDb();
      let thumbnail: typeof toolInfo.thumbnail ;
      if (toolInfo.thumbnail) {
        thumbnail = toolInfo.thumbnail;
      }
  
      // delete toolInfo.thumbnail;
      await ToolModel.findByIdAndUpdate(id, {
        ...toolInfo
        // $push: { thumbnail },
      });
    } catch (error) {
      console.log("Error while updating product, ", (error as any).message);
      throw error;
    }
  };

  export const deleteTool = async (id: string) => {
      try{
        await startDb()
        let tool = await ToolModel.findById(id)
        console.log('tool from delete tool', tool)
        if(tool){
          //@ts-ignore
          await removeImageFromCloud(tool.thumbnail.id)
        }
        await ToolModel.findByIdAndDelete(id)

      }catch(error){
        console.log("Error while deleting product, ", (error as any).message);
         throw error;
      } 
  }


  export const updateImage = async (id: string) => {
    try{
      await startDb()
      let tool = await ToolModel.findById(id)
      console.log('tool from update image', tool)
      if(tool){
        //@ts-ignore
        await removeImageFromCloud(tool.thumbnail.id)
      }
    }catch(error){
      console.log("Error while removing image from cloud product, ", (error as any).message);
       throw error;
    } 
  }

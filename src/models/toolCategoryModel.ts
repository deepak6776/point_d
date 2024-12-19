
import { Document, Model, Schema, model, models } from "mongoose";

export interface NewToolCategory {
    title: string
    description:string
    slug:string
    thumbnail?: { url: string; id: string };
}

export interface ToolCategoryDocument extends NewToolCategory{
    //Virtual Property
}

const toolCategorySchema = new Schema<ToolCategoryDocument>(
    {
        title:{type: String, required: true},
        thumbnail: {
            type: Object,
            required: true,
            url: { type: String, required: true },
            id: { type: String, required: true },
          },
          description:{ type: String, required: true },
          slug: { type: String, required: true },  
    },{
        timestamps: true
    }
);

const ToolCategoryModel = 
      models.ToolCategory || model<ToolCategoryDocument>("ToolCategory", toolCategorySchema)

export default ToolCategoryModel as Model<ToolCategoryDocument>
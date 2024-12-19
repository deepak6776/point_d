
import { Document, Model, Schema, model, models } from "mongoose";

export interface NewBlogCategory {
    title: string
    description:string
    slug:string
    thumbnail?: { url: string; id: string };
}

export interface BlogCategoryDocument extends NewBlogCategory{
    //Virtual Property
}

const blogCategorySchema = new Schema<BlogCategoryDocument>(
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

const BlogCategoryModel = 
      models.BlogCategory || model<BlogCategoryDocument>("BlogCategory", blogCategorySchema)

export default BlogCategoryModel as Model<BlogCategoryDocument>
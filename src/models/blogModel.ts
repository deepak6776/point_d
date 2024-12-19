import { Document, Model, Schema, model, models } from "mongoose";

export interface NewBlog {
    title: string;
    description: string;
    thumbnail?: { url: string; id: string };
    author: string;
    category: string;
    body: string; 
    status: string;
}

export interface BlogDocument extends NewBlog {
    // Virtual property
}

const blogSchema = new Schema<BlogDocument>(
    {
        title: { type: String, required: true },
        description:{type: String, requied: true},
        thumbnail: {
            type: Object,
            required: true,
            url: { type: String, required: true },
            id: { type: String, required: true },
          },
        author: { type: String, required: true },
        category: { type: String, required: true },
        body:{ type: String, required: true },
        status: { type: String, required: true },

    },
    { timestamps: true }
);

const BlogModel =   
    models.Blog || model<BlogDocument>("Blog", blogSchema)

 export default BlogModel as Model<BlogDocument>   
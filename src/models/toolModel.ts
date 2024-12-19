import { Document, Model, Schema, model, models } from "mongoose";


export interface NewTool {
    title: string;
    thumbnail?: { url: string; id: string };
    description: string;
    category: string;
    link: string; 
    status: string;
    author: string;
}

// export interface New AffliateDocument extends NewAffliateProduct {
//     sale: number;
// }

export interface ProductDocument extends NewTool {
    // Virtual property

}

const toolSchema = new Schema<ProductDocument>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        thumbnail: {
            type: Object,
            required: true,
            url: { type: String, required: true },
            id: { type: String, required: true },
          },
        category: { type: String, required: true },
        link:{ type: String, required: true },
        status: { type: String, required: true },
        author: { type: String, required: true }

    },
    { timestamps: true }
);


// Step 4: Check if the model already exists before exporting
const ToolModel =
    models.Tool || model<ProductDocument>("Tool", toolSchema,);

export default ToolModel as Model<ProductDocument>;
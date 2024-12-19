import startDb from "@/lib/db";
import ToolCategoryModel from "@/models/toolCategoryModel";


export async function GET(req:any){
    try{
        await startDb();
        const data = await ToolCategoryModel.find();
        return new Response(JSON.stringify(data),{
            status: 200,
            headers:{'Content-type': 'application/json'}
        })  
    }catch(error){
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
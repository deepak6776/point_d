import startDb from "@/lib/db";
import BlogModel from "@/models/blogModel";

export async function GET(req:any){

    try{
        await startDb();
        const data = await BlogModel.find()
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }catch(error){
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}
import startDb from "@/lib/db";
import BlogCategoryModel from "@/models/blogCategoryModel";


export async function GET(req:any){

    try{
        await startDb();
        const data = await BlogCategoryModel.find()
        console.log('from api', data)
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Cache-Control':'no-store, max-age=0' },
        });
    }catch(error){
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}
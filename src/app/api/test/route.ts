import startDb from "@/lib/db";
import BlogCategoryModel from "@/models/blogCategoryModel";
import numberModel from "@/models/numberModel";


export async function GET(req:any){

    try{
        await startDb();
        const numbers = await numberModel.find(); // Fetch all numbers from the database

        return new Response(JSON.stringify(numbers),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
            

    }catch(error){
        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}


import startDb from "@/lib/db";
import ToolModel from "@/models/toolModel";
import { NewToolInfo } from "@/types";

export const POST = async (req: Request) => {
  const body = await req.json() as NewToolInfo

  await startDb();
  const newTool = await ToolModel.create({
    ...body
  })

  console.log("new tool",newTool)
}
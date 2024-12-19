
import { Button, Flex, Text } from "@chakra-ui/react"
import Link from "next/link"
import ToolTable, {Tool as ToolInterface} from "@/app/components/ToolTable"
import startDb from "@/lib/db"
import ToolModel from "@/models/toolModel"
import { redirect } from "next/navigation"
import CategoryFilter from "@/app/components/ui/CategoryFilter"
import DataTable from "@/app/components/ui/DataTable"
import { columns } from "./columns"
import categories from "@/utils/categories"
import ToolCategoryModel from "@/models/toolCategoryModel"


const fetchTools = async (
  pageNo: number,
  perPage: number
): Promise<ToolInterface[]> => {
  const skipCount = (pageNo - 1) * perPage;

  await startDb();
  const tools = await ToolModel.find()
    .sort("-createdAt")
    // .skip(skipCount)
    // .limit(perPage);

  // const holdings = blogs.length
  // const holdings_id = blogs[0]._id
  // console.log(holdings_id)
  
  return tools.map((tool) => {
    return {
      id: tool._id.toString(),
      title: tool.title,
      thumbnail: tool.thumbnail?.url,
      description: tool.description,
      category: tool.category,
      link: tool.link,
      author: tool.author,
      status: tool.status
    };
  });

};

const TOOLS_PER_PAGE = 10;

interface Props {
  searchParams: {page: string}
}

const fetchToolCategories = async():Promise<any[]> => {
  await startDb();

  const toolCategories = await ToolCategoryModel.find();

  return toolCategories.map((category)=> {
    return category.title
  })
}

export default async function Tool({searchParams}:Props) {

  const {page = "1"} = searchParams


    if (isNaN(+page)) return redirect("/404");

    let hasMore = true;
    const ftools = await fetchTools(+page, TOOLS_PER_PAGE);
    const fToolCategories = await fetchToolCategories()
    if (ftools.length < TOOLS_PER_PAGE) hasMore = false;
    else hasMore = true;

  return (
    <Flex width="80%" ml='auto' p='32px' direction="column" gap="20px">
      <Flex width="100%" height="max-content" alignItems="center">
        <Text mr="auto">Tools</Text>
        {/* <CategoryFilter /> */}
        <Link href="tools/create">
         <Button>Add Item</Button>
        </Link>
      </Flex>
      {/* <ToolTable
       items={ftools}
       currentPageNo={+page}
       hasMore={hasMore}
      
      /> */}
      <DataTable columns={columns} data={ftools} categories={fToolCategories} filterDisplay="flex" />
      
      {/* <Button onClick={() => setIsLoaded((value)=> !value )}>Toggle Loading State</Button> */}
    </Flex>
  )
}

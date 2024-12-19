import TestCreateCard from "@/app/components/ui/TestCreateCard"
import { Flex, Text } from "@chakra-ui/react"

export default function Create() {
  return (
    <Flex  direction='column' alignItems="center" height='100vh' width="80%" ml='auto' p='32px'>
        <Text>Add new source</Text>
        <TestCreateCard />
    </Flex>
  )
}

import { Button, Flex, Heading, Text} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function JoinUs() {
  return (
    
   <Flex className={`joingroupBg`}>
     <Flex className={`joingroup basePadding`}>
      <Flex width={{base:'100%'}} alignItems='center' justifyContent='center'>
        <Image src='/gestures.svg' alt="Illustation in hands making gestures" width="400" height="400" />
      </Flex>
      <Flex direction="column" width={{base:'100%'}} justifyContent='center' gap='24px'>
        <Heading as='h2' fontSize={{base:"32px",sm:'36px', lg:"54px"}}>Here&apos;s the Point!</Heading>
        <Text width={{base:"100%"}}>
          Point is a talented and growing community of creatives and makers, just like you. Collaborate, exchange ideas, and learn from your peers. Remember to be kind.
        </Text>
        <Link href=' https://t.ly/ATsAn' target="_blank">
          <Button className={`btn`} width={{base:"100%", md:"256px"}} marginTop="0">Join the waitlist</Button>
        </Link>
      </Flex>
     </Flex>
   </Flex>
  )
}

import { Flex, Heading, Text } from "@chakra-ui/react"
import styles from './banner.module.css'
import BackButton from "../BackButton"

export default function Banner({description, title}:{description: string, title:string}) {
  return (
    <Flex className={`${styles.bannerBg}`} direction='column'> 
        <Flex className={`${styles.banner}`} width="100%" direction="column">
          <BackButton />
          <Heading as="h1" fontSize="54px" fontWeight="500" mt="3rem" mb="2rem">{title}</Heading>
          <Text>{description}</Text>
        </Flex>
      </Flex>
  )
}

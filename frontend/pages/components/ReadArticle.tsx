import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { useState, useEffect } from "react"
import { client } from '../../services/auth';

interface ArticleProps {
    id: string


}

export default function ReadArticle({ id }: ArticleProps) {

    const [post, setPost] = useState<any>()


    useEffect(() => {

        async function getPostData() {
            if (id) {
                console.log(`mostrando o id: ${id}`)
                const { data } = await client.get(`post/${id}`)
                setPost(data)
            }

        }

        getPostData()

    }, [id])


    return (
        <Container maxW={'7xl'}>

            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 18, md: 24 }}>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'product image'}
                        src={
                            'https://bit.ly/2Z4KKcF'
                        }
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={{ base: '100%', sm: '400px', lg: '500px' }}
                    />
                </Flex>
                <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                            {post?.title}
                        </Heading>
                        <Text
                            color={useColorModeValue('gray.900', 'gray.400')}
                            fontWeight={300}
                            fontSize={'2xl'}>
                            {post?.createdAt}
                        </Text>
                    </Box>

                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.200', 'gray.600')}
                            />
                        }>
                        <VStack spacing={{ base: 4, sm: 6 }}>

                            <Text fontSize={'lg'}>
                                {post?.body}
                            </Text>
                        </VStack>

                    </Stack>




                </Stack>
            </SimpleGrid>
        </Container>
    );
}

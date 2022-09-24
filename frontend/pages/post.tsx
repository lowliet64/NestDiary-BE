import { FormEvent, ChangeEvent, useState, useContext } from 'react';
import {
    Stack,
    FormControl,
    Input,
    Button,
    useColorModeValue,
    FormLabel,
    Heading,
    Text,
    Container,
    Flex,
    Box,
    Textarea
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import Header from "./components/Header"
import { useForm } from "react-hook-form"
import { AuthContext } from './contexts/AuthContext';
import { parseCookies } from "nookies"
import { client } from '../services/auth';
import { useRouter } from 'next/router';



export default function createPost({ userToken }: any) {
    const [email, setEmail] = useState('');
    const [state, setState] = useState<'initial' | 'submitting' | 'success'>(
        'initial'
    );
    const Router = useRouter()
    const [error, setError] = useState(false);
    const { register, handleSubmit } = useForm()
    const { signIn, user, isAuthenticated } = useContext(AuthContext)

    async function handleCreatePost(data: any) {

        let headers: any = {}
        headers.authorization = "Bearer " + userToken
        let response = client.post('post', data, { headers })
        Router.push('/dashboard')

    }

    return (
        <>
            <Header user={user}></Header>
            <Flex
                width="full" alignItems="center" justifyContent="center">
                <Box>
                    <form action="" onSubmit={handleSubmit(handleCreatePost)}>
                        <FormControl isRequired>
                            <FormLabel>Titulo</FormLabel>
                            <Input {...register('title')} placeholder='First name' />
                            <FormLabel>Corpo</FormLabel>
                            <Textarea  {...register('body')} placeholder='First name' />
                            <Button type='submit' colorScheme='teal' mt={2} ml="40%">Salvar</Button>
                        </FormControl>
                    </form>
                </Box>
            </Flex >
        </>
    );
}


export const getServerSideProps = async (ctx: any) => {
    const { 'nextauth.token': token } = parseCookies(ctx)
    console.log(token)

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    return {
        props: {
            userToken: token
        }
    }
}


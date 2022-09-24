import type { NextPage } from 'next'
import { useContext, useEffect, useState } from "react"
import { Box } from '@chakra-ui/react';
import { useForm } from "react-hook-form"
import { AuthContext } from './contexts/AuthContext'
import { Flex } from "@chakra-ui/react"
import Header from "./components/Header"
import CardComponent from "./components/CardComponent"

interface Post {
    title: string
    body: string
    updatedAt: string
    createdAt: string
    id: number
}



import { parseCookies } from "nookies"
import { client } from '../services/auth';
const dashboard: NextPage = ({ userToken }: any) => {
    const { register, handleSubmit } = useForm()
    const { signIn, user, isAuthenticated } = useContext(AuthContext)
    const [postList, setPostList] = useState<[Post] | undefined>()

    useEffect(() => {
        async function getPosts() {
            console.log(signIn)
            console.log(user)
            console.log(AuthContext)
            console.log(isAuthenticated)
            let headers: any = {}
            headers.authorization = "Bearer " + userToken
            let { data } = await client.get('post/me', { headers })
            setPostList(data)
        }
        getPosts()
    },
        [])

    return (

        <>
            <Header user={user}></Header>
            <Box p={4} textAlign="center">Artigos</Box>


            <Flex justifyContent="space-around" flexWrap="wrap">
                {postList?.map(post =>
                    <a href={`/diarys/` + post?.id}>


                        <CardComponent title={post?.title} body={post.body} createdAt={post.createdAt}></CardComponent>
                    </a>
                )}
            </Flex>

        </>

    )
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

export default dashboard

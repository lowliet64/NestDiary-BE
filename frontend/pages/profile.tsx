import type { NextPage } from 'next'
import { useContext, useEffect, useState } from "react"
import Router from "next/router";
import { useForm, Controller } from "react-hook-form"
import { AuthContext } from './contexts/AuthContext'

import Header from "./components/Header"
import { Button, Input, InputGroup, InputLeftAddon, Stack, Box, } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { client } from "../services/auth"

import { parseCookies } from "nookies"
const profile: NextPage = ({ userToken }: any) => {
    const { register, handleSubmit, setValue, control, getValues } = useForm()
    const { signIn, user, isAuthenticated } = useContext(AuthContext)

    const [bio, setBio] = useState(user?.bio)
    const [name, setName] = useState(user?.name)



    console.log(userToken)
    useEffect(() => {

        async function getUserData() {
            let headers: any = {}
            headers.authorization = "Bearer " + userToken
            let { data } = await client.get('user/me', { headers })
            setBio(data?.bio)
            setName(data?.name)
        }
        getUserData()

    },
        [])

    async function handleUpdateUser(e: Event) {
        event?.preventDefault()
        let body = {
            "email": user?.email,
            "name": name,
            "bio": bio
        }

        let headers: any = {}
        headers.authorization = "Bearer " + userToken
        let response = client.patch('user', body, { headers })
        Router.push('/dashboard')

    }



    return (

        <>
            <Header user={user}></Header>
            <h1 style={{ textAlign: "center" }}>Perfil</h1>
            <Box display="flex" justifyContent="center" alignItems="center">
                <form onSubmit={handleUpdateUser}>
                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftAddon children='Nome' />
                            <Input type='text' placeholder='Nome' value={name} {...register('name')} onChange={(e) => setName(e.target.value)} />
                        </InputGroup>

                        {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
                        <InputGroup>
                            <InputLeftAddon children='Email' />
                            <Input type='text' placeholder='Email' value={user?.email} disabled />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon children='Biografia' />
                            <Input type='text' placeholder='phone number' value={bio} onChange={(e) => setBio(e.target.value)} />
                        </InputGroup>
                        <Button colorScheme='teal' size='lg' type='submit'>
                            Salvar
                        </Button>

                        <Controller
                            control={control}
                            rules={{
                                maxLength: 100,
                            }}

                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    {...register('teste')}
                                    onBlur={onBlur}
                                    onChange={(e) => setValue("name", e.target.value)}
                                    value="teste"
                                />
                            )}
                            name="lastName"
                        />
                    </Stack>
                </form>
            </Box>
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

export default profile

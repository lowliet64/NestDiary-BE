import type { NextPage } from 'next'
import { useContext } from "react"
import { Flex, Heading, Input, Button } from '@chakra-ui/react'
import { useForm } from "react-hook-form"
import { AuthContext } from './contexts/AuthContext'

import { parseCookies } from "nookies"
const Home: NextPage = () => {
  const { register, handleSubmit } = useForm()
  const { signIn } = useContext(AuthContext)

  async function handleSignIn(data: any) {

    await signIn(data)
  }
  return (

    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={6}>Log in</Heading>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <Input {...register('email')} placeholder='user@email.com' id="email" name='email' mb={3} type="email"></Input>
          <Input {...register('password')} placeholder='****' id="email" name="password" mb={6} type="password"></Input>
          <Button colorScheme="teal" type="submit" mr={5}>Log in</Button>

          <a href="register">
            <Button colorScheme='teal' variant='outline'>
              Criar uma conta
            </Button>
          </a >
        </form>


      </Flex>
    </Flex>


  )
}


export const getServerSideProps = async (ctx: any) => {
  const { 'nextauth.token': token } = parseCookies(ctx)
  console.log(token)

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}

export default Home

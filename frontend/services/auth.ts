
import axios from "axios"


type SignInRequestData = {
    email: string;
    password: string
}
type SignUpRequestData = {
    email: string;
    password: string
    name: String
}


export const client = axios.create({
    baseURL: 'http://localhost:3000'

})




export async function SignInRequest(data: SignInRequestData) {
    let body = {
        email: data.email,
        password: data.password
    }
    let response = await client.post('/login', body)
    return response.data
}


export async function SignUpRequest(data: SignUpRequestData) {
    let body = {
        email: data.email,
        password: data.password,
        name: data.name
    }
    let response = await client.post('/user', body)
    return response.data
}
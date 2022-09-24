// @flow 
import { Sign } from 'crypto';
import { useState, createContext, useEffect } from 'react';
import { SignInRequest, SignUpRequest } from '../../services/auth';
import { setCookie, parseCookies } from 'nookies';
import Router from "next/router";
import jwt_decode from "jwt-decode"




type User = {
    name: string;
    email: string;
    id: string;
    bio: string
}
type SignInData = {
    email: string;
    password: string;

}


type SignUpData = {

    password: string;
    name: string;
    email: string;

}
type AuthContextType = {
    isAuthenticated: boolean
    user: User,
    signIn: (data: SignInData) => Promise<void>
    signUp: (data: SignUpData) => Promise<void>

}

export const AuthContext = createContext({} as AuthContextType)
export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<any>()
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies()

        if (token) {
            let userFromToken = jwt_decode(token)
            setUser(userFromToken)
        }

    }, [])

    async function signIn({ email, password }: SignInData) {
        const { access_token } = await SignInRequest({
            email,
            password,
        })

        setCookie(undefined, 'nextauth.token', access_token, {
            maxAge: 60 * 60 * 1, // 1 hour
        })

        // api.defaults.headers['Authorization'] = `Bearer ${token}`;
        let userFromToken = jwt_decode(access_token)
        setUser(userFromToken)
        Router.push('/dashboard');
    }

    async function signUp({ email, password, name }: SignUpData) {
        const responseData = await SignUpRequest({
            email,
            password,
            name
        })

        await signIn({ email, password })


    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}
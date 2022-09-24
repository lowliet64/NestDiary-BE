import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { client } from '../../services/auth'

import Header from "../components/Header"
import ReadArticle from "../components/ReadArticle"


export default function ReadPage() {
    const router = useRouter()
    const id = router.query.id as string

    const [post, setPost] = useState<any>()



    return (
        <>

            <Header></Header>
            <ReadArticle id={id} ></ReadArticle>
        </>)
}
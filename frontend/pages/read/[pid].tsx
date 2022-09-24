
import ReatArticle from "../components/ReadArticle"
import Header from "../components/Header"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { client } from "../../services/auth"
import { useRouter } from 'next/router'


export default function read() {
    const { signIn, user, isAuthenticated } = useContext(AuthContext)
    const router = useRouter()


    const pid = router.query.pid as string
    console.log(pid)
    const [id, setId] = useState(pid)

    const [article, setArticle] = useState<any>({})

    useEffect(() => {

        async function getPostData() {
            if (id) {
                const { data } = await client.get('post/' + id)
                setArticle(data)
            }
        }
        getPostData()

    }, [])

    return (
        <h1>
            <Header user={user}></Header>
            <ReatArticle title={article?.title} body={article?.body} createdAt={article?.createdAt}></ReatArticle>
            <p>{id}</p>
        </h1>
    )

}
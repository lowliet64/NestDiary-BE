import { User } from "../../user/entities/user.entity"

export class Post {
    id?: number;
    title: string
    body: string
    createdAt: string
    updatedAt: string
    author: User
    authorId: number

}

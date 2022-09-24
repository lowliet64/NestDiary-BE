import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPostDto: CreatePostDto) {

    let { title, body, authorId } = createPostDto
    let post = await this.prisma.post.create({ data: { title, body, authorId } })

    return createPostDto
  }

  async findAll() {
    return await this.prisma.post.findMany()
  }


  async findManyPerAuthorId(authorId: number) {
    return await this.prisma.post.findMany({
      where: {
        authorId: authorId
      }
    })
  }

  async findOne(id: number) {
    return await this.prisma.post.findUnique({
      where: {
        id: id
      }
    })
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

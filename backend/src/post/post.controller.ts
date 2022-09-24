import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { request } from 'http';
import jwtDecode from 'jwt-decode';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  create(@Request() req, @Body() createPostDto: CreatePostDto) {

    let { title, body } = createPostDto

    const accessToken = req.headers.authorization.split(" ")[1]
    let currentUser = jwtDecode(accessToken)

    let authorId = currentUser["sub"]


    return this.postService.create({ title, body, authorId });
  }

  @Get()
  @IsPublic()
  findAll() {
    return this.postService.findAll();
  }

  @Get('me')
  findMines(@Request() req) {
    console.log('minhas requisições')
    return this.postService.findManyPerAuthorId(req.user.id);
  }


  @Get(':id')
  @IsPublic()
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}

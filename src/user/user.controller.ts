import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { ExtractJwt } from 'passport-jwt'
import jwt_decode from "jwt-decode";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }



  @Delete(':id')
  @IsPublic()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }


  @Patch()
  @IsPublic()
  update(@Body() updateUserDto: UpdateUserDto, @Request() req) {

    const accessToken = req.headers.authorization.split(" ")[1]
    let currentUser = jwt_decode(accessToken)
    console.log(currentUser)
    let id = currentUser["sub"]
    return this.userService.update(id, updateUserDto);
  }


  @Get()
  findAll(@Request() req) {

    return this.userService.findAll();
  }


  @Get(':id')
  @IsPublic()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }




}

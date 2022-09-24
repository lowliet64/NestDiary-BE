import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,

      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async remove(id: string) {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    })

  }

  async findAll(): Promise<[User]> {
    const data: any = await this.prisma.user.findMany()
    return data
  }

  async update(id: any, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.prisma.user.update(
      {
        where: {
          id: parseInt(id),
        },
        data: updateUserDto,
      }
    )

    return {
      ...updatedUser,
      password: undefined,
    };

  }


  async findOne(id: any) {
    let user = await this.prisma.user.findUnique(
      {
        where: {
          id: parseInt(id),
        }
      }
    )

    return user
  }



  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });

  }




}
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {


    @IsString()
    bio: string
}

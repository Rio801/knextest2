import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './CreateUserDTO';
import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsNumber()
  u_id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

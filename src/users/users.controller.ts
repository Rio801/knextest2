import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpateUserDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUser: CreateUserDTO) {
    return this.userService.createUser(createUser);
  }

  @Get()
  getAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  getUno(@Param('id') id: string) {
    return this.userService.findUno(Number(id));
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateuser: UpdateUserDTO) {
    return this.userService.updateUser(Number(id), updateuser);
  }
  // @Delete(':id')
  // async deleteUser(@Param('id') id: string) {
  //     return this.userService.deleteUser(Number(id));
  // }
}

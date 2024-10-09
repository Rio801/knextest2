import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { knex } from 'knex';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdateUserDTO } from './dto/UpateUserDTO';
import { throwError } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

//TODO:change password returns with refresh tokens
//TODO:ADD JWT AND COOKIES
//TODO:HASH PASSWORDS AND THEN INSERT IT INTO THE DATA BASE
//TODO: ADD UPDATE USER AND DELETE USER FUNCTIONS
//TODO:throw error if not in database

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    try {
      const knex = await this.databaseService.getKnex();
      return await knex.select('*').from('users');
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async createUser(createUser: CreateUserDTO) {
    try {
      const hashedPassword = await bcrypt.hash(createUser.password, 10);

      const [userId] = await this.databaseService
        .getKnex()('users')
        .insert({
          password: hashedPassword,
          email: createUser.email,
        })
        .returning('id');

      return { id: userId, ...createUser };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findUno(id: number) {
    if (!id) {
      throw new NotFoundException(`Users ${id} was not found`);
    }
    try {
      const userUno = this.databaseService.getKnex();
      return await userUno
        .select('email', 'password')
        .from('users')
        .where('u_id', id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
  async updateUser(id: number, updateuser: UpdateUserDTO) {
    if (!id) {
      throw new NotFoundException(`Users ${id} was not found`);
    }

    try {
      const upUser = this.databaseService
        .getKnex()
        .select('email', 'password')
        .from('users')
        .where('u_id', id)
        .update({
          email: updateuser.email,
          password: updateuser.password,
        });

      return { upUser };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // async deleteUser(id: number) {
  //   if (!id) {
  //     throw new NotFoundException(`Users ${id} was not found`);
  //   }
  //   try {
  //     const delUser = await this.knexI('users').where('u_id', id).del();

  //     return { delUser };
  //   } catch (error) {
  //     throw new HttpException(error, HttpStatus.NOT_FOUND);
  //   }
  // }
}

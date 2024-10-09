import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as Knex from 'knex';
import knexConfig from '../../knexfile';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private knex;
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.knex = Knex({
      client: 'mysql2', // or 'mysql'
      connection: {
        host: this.configService.get<string>('DB_HOST'),
        port: this.configService.get<number>('DB_PORT'),
        user: this.configService.get<string>('DB_USER'),
        password: this.configService.get<string>('DB_PASSWORD'),
        database: this.configService.get<string>('DB_NAME'),
      },
    });
  }

  onModuleDestroy() {
    return this.knex.destroy();
  }

  getKnex() {
    return this.knex;
  }
}

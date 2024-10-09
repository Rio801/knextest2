import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTableIfNotExists(
    'users',
    (table: Knex.TableBuilder) => {
      table.increments('u_id').primary().notNullable;
      table.string('email', 255).unique().notNullable;
      table.string('password', 255).notNullable;
      table.string('refreshToken', 255).notNullable;
    },
  );
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}

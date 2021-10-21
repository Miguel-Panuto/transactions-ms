module.exports = async (knex) => {
  const tableLogs = await knex.schema.hasTable('users');
  if (tableLogs) return;
  await knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('document').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('phone').notNullable().unique();
    table.string('key').unique();
  });
};

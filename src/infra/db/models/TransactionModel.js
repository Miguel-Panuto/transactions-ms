module.exports = async (knex) => {
  const tableLogs = await knex.schema.hasTable('transactions');
  if (tableLogs) return;
  await knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table.string('from_id').notNullable();
    table.string('to_id').notNullable();
    table.string('type').notNullable();
    table.double('cash_amount').notNullable();
    table.integer('status_id').notNullable().defaultTo(1);
    table.date('created_at').notNullable().defaultTo(knex.fn.now());
    table.string('uuid').unique().notNullable();
    table.date('status_changed_at');

    table.foreign('from_id').references('id').inTable('users');
    table.foreign('to_id').references('id').inTable('users');
    table.foreign('status_id').references('id').inTable('status');
  });
};

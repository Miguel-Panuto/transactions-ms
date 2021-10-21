module.exports = async (knex) => {
  const tableStatus = await knex.schema.hasTable('status');
  if (tableStatus) return;
  await knex.schema
    .createTable('status', (table) => {
      table.increments('id').primary();
      table.string('status').notNullable();
    })
    .then(async () => {
      const data = [
        { status: 'SYSTEM PROCCESS' },
        { status: 'WAITING USER APROVAL' },
        { status: 'APROVED' },
        { status: 'DENIED' },
      ];
      await knex.insert(data).into('status');
    });
};

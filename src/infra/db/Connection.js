module.exports = ({ config }) => {
  const knex = require('knex')(config.db);

  return knex;
};

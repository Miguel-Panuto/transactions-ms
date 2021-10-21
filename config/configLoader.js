const config = require('./config.json');

module.exports = {
  ...config,
  amqp: {
    ...config.amqp,
    uri: process.env.AMQP_URI || config.amqp.uri,
  },
  db: {
    ...config.db,
    connection: {
      host: process.env.DB_HOST || config.db.connection.host,
      port: process.env.DB_PORT || config.db.connection.port,
      user: process.env.DB_USER || config.db.connection.username,
      password: process.env.DB_PASS || config.db.connection.password,
      database: process.env.DB_DATABASE || config.db.connection.database,
    },
  },
};

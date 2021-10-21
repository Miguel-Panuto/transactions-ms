const {
  createContainer,
  asClass,
  asFunction,
  asValue,
  InjectionMode,
} = require('awilix');

const Server = require('./interfaces/http/Server');
const AmqpClient = require('./infra/amqp/AmqpClient');
const AmqpChannels = require('./infra/amqp/AmqpChannels');
const pubSub = require('./infra/amqp/PubSub');
const Router = require('./interfaces/http/Router');
const logger = require('./infra/logging/Logger');
const db = require('./infra/db/Connection');
const initTables = require('./infra/db/models/InitiateTables');

const config = require('config/configLoader');

const container = createContainer()
  .register({
    server: asClass(Server).singleton(),
    logger: asFunction(logger).singleton(),
    router: asFunction(Router),
    config: asValue(config),
    amqpClient: asClass(AmqpClient).singleton(),
    amqpChannels: asClass(AmqpChannels).singleton(),
    db: asFunction(db).singleton(),
    initiateTables: asFunction(initTables).singleton(),
    pubSub: asFunction(pubSub).singleton(),
  })
  .loadModules(
    [
      './infra/integration/**/*.js',
      './infra/repositories/*.js',
      './app/**/*.js',
      './interfaces/http/**/*.js',
      './interfaces/amqp/**/*.js',
    ],
    {
      cwd: __dirname,
      formatName: 'camelCase',
      resolverOptions: {
        injectionMode: InjectionMode.PROXY,
      },
    }
  );

module.exports = container;

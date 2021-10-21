const Transport = require('winston-transport');
const { connect } = require('amqplib');

const config = require('config/configLoader');

module.exports = class AmqpLogger extends Transport {
  constructor(opts) {
    super(opts);
    this.serviceName = config.serviceName;
  }

  async log(info, callBack) {
    const messageToSend = JSON.stringify({
      message: info.message || null,
      level: info.level || null,
      timestamp: new Date(),
      service_name: this.serviceName || null,
    });
    const conn = await connect(config.amqp.uri);
    const channel = await conn.createChannel();
    await channel.assertExchange('send-logs', 'fanout');

    channel.publish('send-logs', '', Buffer.from(messageToSend));
    callBack();
  }
}

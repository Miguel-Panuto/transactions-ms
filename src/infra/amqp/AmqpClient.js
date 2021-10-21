const { connect } = require('amqplib');

module.exports = class AmqpClient {
  type = '[AMQP] =>';

  constructor({
    config: {
      amqp: { uri },
    },
    logger,
  }) {
    this.uri = uri;
    this.conn = null;
    this.channel = null;
    this.logger = logger;
  }

  async start() {
    this.logger.info(`${this.type} starting aqmp connection`);
    try {
      await this._startConnection();
      await this._startChannel();
      this.logger.info(`${this.type} success on connect`);
    } catch (err) {
      this.logger.error(`${this.type} fail to connect to amqp`, err);
    }
  }

  async disconnect() {
    this.logger.info(`${this.type} sarting desconnection`);
    if (this.conn === null) return;
    await this.conn.close();
    this.logger.info(`${this.type} desconnected`);
  }

  async getChannel() {
    if (this.channel === null) await this._startChannel();
    if (this.channel === null)
      throw new Error(`${this.type} tried to stablish channel 2 times`);
    return this.channel;
  }

  async _startConnection() {
    this.conn = await connect(this.uri);
  }

  async _startChannel() {
    if (this.conn === null) await this._startConnection();
    if (this.conn === null)
      throw new Error(`${this.type} tried to connect 2 times`);
    this.channel = await this.conn.createChannel();
  }
};

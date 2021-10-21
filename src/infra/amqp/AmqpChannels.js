module.exports = class AmqpChannels {
  constructor({
    logger,
    amqpClient,
    config: {
      amqp: { subs, pubs },
    },
  }) {
    this.logger = logger;
    this.type = amqpClient.type;
    this.amqpClient = amqpClient;
    this.subs = subs;
    this.pubs = pubs;
  }

  async createExchanges() {
    const channel = await this.amqpClient.getChannel();
    const auxExchanges = [...this.subs, ...this.pubs];
    const allExchanges = [];
    auxExchanges.forEach((ex) => {
      const index = allExchanges.findIndex(
        ({ topicName }) => topicName === ex.topicName
      );
      if (index < 0) allExchanges.push(ex);
    });
    if (allExchanges.length > 0)
      allExchanges.forEach(async (topic) => {
        this.logger.info(
          `${this.type} on topic: ${topic.topicName} with type: ${topic.topicType}`
        );
        await channel.assertExchange(topic.topicEvent, topic.topicType);
      });
  }
};

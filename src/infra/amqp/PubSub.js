const fileName = 'PubSub';

const _createMessage = (message) => Buffer.from(JSON.stringify(message));

module.exports = ({
  logger,
  amqpClient,
  config: {
    amqp: { subs, pubs },
    serviceName,
  },
}) => ({
  subscribe: async (topicName, callBack) => {
    const channel = await amqpClient.getChannel();
    const topic = subs.find(
      (sub) => sub.topicName === topicName
    )
    const q = await channel.assertQueue(`${topic.topicEvent}_${serviceName}`);
    if (!topic) throw new Error('No event found');
    await channel.bindQueue(
      q.queue,
      topic.topicEvent,
      topic.routingKey
    );
    await channel.consume(
      q.queue,
      async (msg) => {
        if (!msg?.content) throw new Error('message has no content');
        const content = msg.content.toString();
        callBack(JSON.parse(content));
      },
      { noAck: false }
    );
  },

  publish: async (topicName, message) => {
    const callName = `${fileName}.publish()`;
    const topic = pubs.find((pub) => pub.topicName === topicName);
    if (!topic) throw new Error('No event found');
    const channel = await amqpClient.getChannel();
    logger.info(
      `${callName} - Publishing in exchange the message in exchange ${topic.topicName}`,
      message
    );
    return channel.publish(
      topic.topicEvent,
      topic.routingKey,
      _createMessage(message)
    );
  },
});

const makeTransaction = require('../entities/TransactionEntity');

const makePubEntity = require('../entities/PubEntity');

const fileName = 'RequestTransactionUsecase';

module.exports = ({
  logger,
  transactionRepository,
  userRepository,
  pubSub,
  config: {
    amqp: { pubs },
  },
}) => ({
  send: async (id, data) => {
    const callName = `${fileName}.send()`;
    logger.info(
      `${callName} entered with id: ${id}. And data: ${JSON.stringify(data)}`
    );
    const transaction = makeTransaction({ ...data, type: 'send' }, id);
    const { id: to_id } = await userRepository.findUserIdByKey(
      transaction.to_id
    );
    transaction.to_id = to_id;
    if (transaction.to_id === transaction.from_id) throw new Error('same user');
    await transactionRepository.createTransaction(transaction);
    const newTransaction = await transactionRepository.findTransactionByUuid(
      transaction.uuid
    );

    pubSub
      .publish(pubs[1].topicName, makePubEntity(newTransaction))
      .then(() => {
        logger.info(
          `${callName} transaction sended on queue ${pubs[1].topicName}`
        );
      });

    return newTransaction;
  },
});

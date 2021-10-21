const makePubEntity = require('../entities/PubEntity');
const makeTransaction = require('../entities/ResumeTransactions');

const fileName = 'ResumeTransactionUsecase';

module.exports = ({
  logger,
  transactionRepository,
  pubSub,
  config: {
    amqp: { pubs },
  },
}) => ({
  resume: async (id, onlyProval = false) => {
    const callName = `${fileName}.find()`;
    logger.info(`${callName} entered with id: ${id}`);
    const transactions = await transactionRepository.resumeTransactions(id, onlyProval);
    logger.info(`${callName} wallet finded: ${JSON.stringify(transactions)}`);
    const resendPubs = transactions.filter(
      (transaction) => transaction.status_id === 1
    );

    resendPubs.forEach(async (transaction) => {
      if (transaction.type === 'request') {
        await pubSub.publish(
          pubs[1].topicName,
          makePubEntity({
            ...transaction,
            from_id: transaction.to_id,
            to_id: transaction.from_id,
          })
        );
      } else if (transaction.type === 'send') {
        await pubSub.publish(pubs[1].topicName, makePubEntity(transaction));
      }
    });
    return transactions.map(makeTransaction);
  },
});

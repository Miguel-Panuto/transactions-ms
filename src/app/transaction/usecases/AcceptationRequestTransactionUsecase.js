const makeNewStatus = require('../entities/ChangeStatusEntity');
const makePubEntity = require('../entities/PubEntity');

const fileName = 'AcceptRequestTransactionUsecase';

module.exports = ({
  logger,
  transactionRepository,
  pubSub,
  config: {
    amqp: { pubs },
  },
}) => ({
  acceptation: async (isAccepted, id, userId) => {
    const callName = `${fileName}.acceptation()`;
    logger.info(`${callName} entered with id: ${id}`);
    
    const userTransactions = await transactionRepository.resumeTransactions(
      userId,
      true
    );
    if (!userTransactions.find((transaction) => transaction.id === id))
      throw new Error('user does not have transaction');
  
    const newStatus = makeNewStatus(isAccepted ? 1 : 4);
    await transactionRepository.acceptationTransaction(id, newStatus);
    const transaction = await transactionRepository.findTransactionById(id);
    if (newStatus.status_id === 4) return transaction;
    const pubTransaction = makePubEntity({
      ...transaction,
      from_id: transaction.to_id,
      to_id: transaction.from_id,
    });
    await pubSub.publish(pubs[1].topicName, pubTransaction);
    return transaction;
  },
});

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
  proval: async (transaction) => {
    const callName = `${fileName}.proval()`;
    logger.info(`${callName} entered with id: ${transaction.id}`);
    const newStatus = makeNewStatus(transaction.status_id);
    await transactionRepository.acceptationTransactionById(transaction.id, newStatus);
    const findedTransaction = await transactionRepository.findTransactionById(transaction.id);
    return findedTransaction;
  },
});

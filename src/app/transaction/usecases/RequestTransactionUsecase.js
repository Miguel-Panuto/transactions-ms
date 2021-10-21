const makeTransaction = require('../entities/TransactionEntity');

const fileName = 'RequestTransactionUsecase';

module.exports = ({ logger, transactionRepository, userRepository }) => ({
  request: async (id, data) => {
    const callName = `${fileName}.request()`;
    logger.info(
      `${callName} entered with id: ${id}. And data: ${JSON.stringify(data)}`
    );
    const transaction = makeTransaction({ ...data, type: 'request' }, id);
    const { id: to_id } = await userRepository.findUserIdByKey(
      transaction.to_id
    );
    if (id === to_id) throw new Error('user can not be same');
    transaction.to_id = to_id;
    await transactionRepository.createTransaction(transaction);
    const newTransaction = await transactionRepository.findTransactionByUuid(
      transaction.uuid
    );

    return newTransaction;
  },
});

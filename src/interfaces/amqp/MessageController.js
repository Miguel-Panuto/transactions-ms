const fileName = 'MessageController';

module.exports = ({
  logger,
  createUserUsecase,
  updateUserUsecase,
  provalTransactionUsecase,
}) => ({
  onUserChange: async (msg) => {
    const callName = `${fileName}.onUserChange()`;
    logger.info(`${callName} entered, with payload: ${JSON.stringify(msg)}`);
    try {
      if (msg.event_type === 'create') {
        await createUserUsecase.create(msg.user);
      } else if (msg.event_type === 'update') {
        await updateUserUsecase.update(msg.user);
      }
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
    }
  },

  onTransactionProval: async (msg) => {
    const callName = `${fileName}.onTransactionProval()`;
    logger.info(`${callName} entered, with payload: ${JSON.stringify(msg)}`);
    try {
      const proval = await provalTransactionUsecase.proval(msg);
      logger.info(`${callName} proval returned: ${JSON.stringify(proval)}`);
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
    }
  },
});

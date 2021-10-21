const fileName = 'TransactionsController';

module.exports = ({
  logger,
  resumeTransactionsUsecase,
  updateUserKeyUsecase,
  sendTransactionUsecase,
  requestTransactionUsecase,
  acceptationRequestTransactionUsecase,
}) => ({
  resumeTransactions: async (req, res) => {
    const callName = `${fileName}.resumeTransactions()`;
    const { onlyProval } = req.query;
    const { id } = req.params;
    try {
      logger.info(`${callName} entered with id: ${id}`);
      const transactions = await resumeTransactionsUsecase.resume(
        id,
        onlyProval
      );
      const status = !transactions ? 204 : 200;
      return res.status(status).json(transactions);
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
      return res.status(403).json({ error: err.message });
    }
  },

  sendTransaction: async (req, res) => {
    const callName = `${fileName}.sendTransaction()`;
    const { body, params } = req;
    try {
      const { id } = params;
      logger.info(
        `${callName} entered with id: ${id}. And body: ${JSON.stringify(body)}`
      );
      const response = await sendTransactionUsecase.send(id, body);
      const status = !response ? 204 : 200;
      return res.status(status).json(response);
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
      return res.status(403).json({ error: err.message });
    }
  },

  requestTransaction: async (req, res) => {
    const callName = `${fileName}.requestTransaction()`;
    const { body, params } = req;
    try {
      const { id } = params;
      logger.info(
        `${callName} entered with id: ${id}. And body: ${JSON.stringify(body)}`
      );
      const response = await requestTransactionUsecase.request(id, body);
      const status = !response ? 204 : 200;
      return res.status(status).json(response);
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
      return res.status(403).json({ error: err.message });
    }
  },

  acceptRequest: async (req, res) => {
    const callName = `${fileName}.acceptRequest()`;
    const { body, params } = req;
    const { id } = params;
    try {
      logger.info(
        `${callName} entered with id: ${id}. And body: ${JSON.stringify(body)}`
      );
      const response = await acceptationRequestTransactionUsecase.acceptation(
        body.aprovation,
        body.id,
        id
      );
      return res.status(200).json(response);
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
      return res.status(403).json({ error: err.message });
    }
  },

  setKey: async (req, res) => {
    const callName = `${fileName}.setKey()`;
    const { body, params } = req;
    try {
      const { id } = params;
      logger.info(
        `${callName} entered with id: ${id}. And body: ${JSON.stringify(body)}`
      );
      const response = await updateUserKeyUsecase.update(id, body.key);
      const status = !response ? 204 : 200;
      return res.status(status).json(response);
    } catch (err) {
      logger.error(`${callName} error ocoured: ${err}`);
      return res.status(403).json({ error: err.message });
    }
  },
});

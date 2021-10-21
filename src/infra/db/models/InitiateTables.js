const userModel = require('./UserModel');
const statusModel = require('./StatusModel');
const transactionModel = require('./TransactionModel');

module.exports = ({ db }) => ({
  initiate: async () => {
    await userModel(db).then(
      async () =>
        await statusModel(db).then(async () => await transactionModel(db))
    );
  },
});

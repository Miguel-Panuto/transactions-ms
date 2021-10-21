const fileName = 'TransactionRepository';

module.exports = ({ logger, db }) => ({
  findTransactionByUuid: (uuid) => {
    const callName = `${fileName}.findTransactionByUuid()`;
    logger.info(`${callName} entered with uuid: ${uuid}`);
    return db.select('*').from('transactions').where('uuid', uuid).first();
  },

  findTransactionById: (id) => {
    const callName = `${fileName}.findTransactionById()`;
    logger.info(`${callName} entered with id: ${id}`);
    return db.select('*').from('transactions').where('id', id).first();
  },

  resumeTransactions: (id, onlyProval) => {
    const callName = `${fileName}.resumeTransactions()`;
    logger.info(`${callName} entered with id: ${id}`);
    const bsSelect = db
      .select(
        'transactions.id',
        'userFrom.name as fromName',
        'userTo.name as toName',
        'userFrom.id as from_id',
        'userTo.id as to_id',
        'transactions.cash_amount',
        'transactions.type',
        'transactions.status_id',
        'status.status',
        'transactions.uuid',
        'transactions.created_at',
        'transactions.status_changed_at'
      )
      .from('transactions')
      .leftJoin('users as userFrom', 'userFrom.id', 'transactions.from_id')
      .leftJoin('users as userTo', 'userTo.id', 'transactions.to_id')
      .leftJoin('status', 'status.id', 'transactions.status_id')
      .where(function () {
        this.where('transactions.from_id', id).orWhere(
          'transactions.to_id',
          id
        );
      })
      .orderBy('transactions.id');
    if (!onlyProval) return bsSelect;
    return bsSelect
      .andWhere('transactions.status_id', 2)
      .andWhere('transactions.to_id', id);
  },

  createTransaction: (transaction) => {
    const callName = `${fileName}.createTransaction()`;
    logger.info(
      `${callName} entered with transaction: ${JSON.stringify(transaction)}`
    );
    return db.insert(transaction).into('transactions');
  },

  acceptationTransaction: (id, newStatus) => {
    const callName = `${fileName}.acceptationTransaction()`;
    logger.info(`${callName} entered with id: ${id}`);
    return db.update(newStatus).into('transactions').where('id', id);
  },

  acceptationTransactionById: (id, newStatus) => {
    const callName = `${fileName}.acceptationTransactionBtId()`;
    logger.info(`${callName} entered with id: ${id}`);
    return db.update(newStatus).into('transactions').where('id', id);
  },
});

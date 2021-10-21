const formatDate = require('src/utils/DateFormat');

module.exports = (transaction) => ({
  id: transaction.id || null,
  fromName: transaction.fromName || null,
  toName: transaction.toName || null,
  cashAmount: transaction.cash_amount || null,
  status: transaction.status || null,
  createdAt: formatDate(transaction.created_at) || null,
  statusChangedAt:
    transaction.status_changed_at === null
      ? null
      : formatDate(transaction.status_changed_at),
});

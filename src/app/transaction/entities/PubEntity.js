module.exports = (transaction) => {
  return {
    id: transaction.id || null,
    uuid: transaction.uuid || null,
    from_id: transaction.from_id || null,
    to_id: transaction.to_id || null,
    cash_amount: transaction.cash_amount || null,
  };
};

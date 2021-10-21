const { v4 } = require('uuid');

module.exports = (transaction, id) => {
  const findedType = ['send', 'request'].find(
    (type) => type === transaction.type
  );
  if (!findedType) throw new Error('not defined type');
  return {
    to_id: transaction.to_key || null,
    from_id: id || null,
    type: findedType,
    cash_amount: transaction.cash_amount || null,
    status_id: findedType === 'request' ? 2 : 1,
    uuid: v4(),
  };
};

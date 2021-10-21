module.exports = ({ transactionsController }) => [
  {
    method: 'get',
    path: '/transaction/:id',
    handler: transactionsController.resumeTransactions,
  },
  {
    method: 'post',
    path: '/transaction-send/:id',
    handler: transactionsController.sendTransaction,
  },
  {
    method: 'post',
    path: '/transaction-request/:id',
    handler: transactionsController.requestTransaction,
  },
  {
    method: 'put',
    path: '/transaction-request/:id',
    handler: transactionsController.acceptRequest,
  },
  {
    method: 'put',
    path: '/user/:id',
    handler: transactionsController.setKey,
  },
];

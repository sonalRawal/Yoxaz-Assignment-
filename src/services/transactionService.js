const Transaction = require('../models/Transaction');

exports.createTransaction = async (transactionData, userId) => {
  transactionData.user = userId;
  const transaction = await Transaction.create(transactionData);
  return transaction;
};

exports.getTransactionsByUser = async (userId) => {
  return await Transaction.find({ user: userId }).sort('-date');
};
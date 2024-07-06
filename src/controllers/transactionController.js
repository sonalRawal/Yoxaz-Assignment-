const transactionService = require('../services/transactionService');
const asyncHandler = require('../utils/asyncHandler');

exports.createTransaction = asyncHandler(async (req, res) => {
  const transaction = await transactionService.createTransaction(req.body, req.user.id);
  res.status(201).json({
    success: true,
    data: transaction,
  });
});
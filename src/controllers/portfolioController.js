const portfolioService = require('../services/portfolioService');
const transactionService = require('../services/transactionService');
const asyncHandler = require('../utils/asyncHandler');

exports.getPortfolio = asyncHandler(async (req, res) => {
  const { portfolio, totalValue } = await portfolioService.calculatePortfolio(req.user.id);
  res.status(200).json({
    success: true,
    data: {
      portfolio,
      totalValue,
    },
  });
});

exports.getPortfolioHistory = asyncHandler(async (req, res) => {
  const transactions = await transactionService.getTransactionsByUser(req.user.id);
  res.status(200).json({
    success: true,
    data: transactions,
  });
});
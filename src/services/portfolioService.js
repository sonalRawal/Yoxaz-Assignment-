const Transaction = require('../models/Transaction');

exports.calculatePortfolio = async (userId) => {
  const transactions = await Transaction.find({ user: userId });

  let portfolio = {};
  let totalValue = 0;

  transactions.forEach((transaction) => {
    if (!portfolio[transaction.asset]) {
      portfolio[transaction.asset] = {
        quantity: 0,
        totalCost: 0,
      };
    }

    if (transaction.type === 'buy') {
      portfolio[transaction.asset].quantity += transaction.amount;
      portfolio[transaction.asset].totalCost += transaction.amount * transaction.price;
    } else if (transaction.type === 'sell') {
      portfolio[transaction.asset].quantity -= transaction.amount;
      portfolio[transaction.asset].totalCost -= transaction.amount * transaction.price;
    }
  });

  // Calculate current value (using mock prices)
  Object.keys(portfolio).forEach((asset) => {
    const currentPrice = getMockCurrentPrice(asset);
    portfolio[asset].currentPrice = currentPrice;
    portfolio[asset].currentValue = portfolio[asset].quantity * currentPrice;
    portfolio[asset].profitLoss = portfolio[asset].currentValue - portfolio[asset].totalCost;
    totalValue += portfolio[asset].currentValue;
  });

  return { portfolio, totalValue };
};

function getMockCurrentPrice(asset) {
  // This is a mock function. In a real application, you would fetch real-time prices from an API
  const mockPrices = {
    BTC: 35000,
    ETH: 2000,
    AAPL: 150,
  };
  return mockPrices[asset] || 100; // Default to 100 if asset not found
}
const express = require('express');
const { getPortfolio, getPortfolioHistory } = require('../controllers/portfolioController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getPortfolio);
router.get('/history', protect, getPortfolioHistory);

module.exports = router;
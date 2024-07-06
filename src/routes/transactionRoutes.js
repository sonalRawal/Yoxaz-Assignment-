const express = require('express');
const { createTransaction } = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createTransaction);

module.exports = router;
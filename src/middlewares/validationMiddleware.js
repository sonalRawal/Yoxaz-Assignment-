const { body, validationResult } = require('express-validator');

exports.validateTransaction = [
  body('type').isIn(['deposit', 'withdrawal', 'buy', 'sell']),
  body('amount').isFloat({ min: 0.01 }),
  body('asset').if(body('type').isIn(['buy', 'sell'])).notEmpty(),
  body('price').if(body('type').isIn(['buy', 'sell'])).isFloat({ min: 0.01 }),
  body('date').optional().isISO8601(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
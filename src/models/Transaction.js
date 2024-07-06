const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'buy', 'sell'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  asset: {
    type: String,
    required: function () {
      return ['buy', 'sell'].includes(this.type);
    },
  },
  price: {
    type: Number,
    required: function () {
      return ['buy', 'sell'].includes(this.type);
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
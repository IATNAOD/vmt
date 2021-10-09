const mongoose = require('mongoose');

const { Schema } = mongoose;

const TransactionsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  description: {
    RUS: {
      type: String,
      default: ''
    },
    ENG: {
      type: String,
      default: ''
    }
  },
  type: {
    type: String,
    default: 'INCOME'
  },
  value: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
});

mongoose.model('Transactions', TransactionsSchema);
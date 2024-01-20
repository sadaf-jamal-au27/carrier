// models/Expression.js
const mongoose = require('mongoose');

const expressionSchema = new mongoose.Schema({
  expression: {
    type: String,
    required: true,
  },
});

const Expression = mongoose.model('Expression', expressionSchema);

module.exports = Expression;

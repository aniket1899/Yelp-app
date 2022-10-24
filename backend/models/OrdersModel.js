const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant',
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  deliveryOption: {
    type: String,
    default: '',
    required: true,
  },
  status: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'New',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;

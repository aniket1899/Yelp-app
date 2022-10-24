const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant',
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  messages: [
    {
      usertype: {
        type: String,
      },
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  date: { type: Date, default: Date.now() },
});

const Message = mongoose.model('message', MessageSchema);
module.exports = Message;

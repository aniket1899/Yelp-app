const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant',
    required: true,
  },
  customer: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String },
  hashtags: { type: String },
  eventDate: { type: Date },
  image: { type: String },
  date: { type: Date, default: Date.now() },
});

const Event = mongoose.model('event', EventSchema);
module.exports = Event;

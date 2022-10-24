const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  phone: { type: String },
  about: {
    dob: {
      type: Date,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    nickname: {
      type: String,
      default: '',
    },
    thingsILove: {
      type: String,
      default: '',
    },
    findMeIn: {
      type: String,
      default: '',
    },
    myBlog: {
      type: String,
      default: '',
    },
    notYelping: {
      type: String,
      default: '',
    },
    whyMyReviews: {
      type: String,
      default: '',
    },
    discovery: {
      type: String,
      default: '',
    },
  },
  reviews: [
    {
      restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  following: {
    // {
    //   customer: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user',
    //     required: true,
    //   },
    // },
    type: [mongoose.Schema.Types.ObjectId],
  },
  date: { type: Date, default: Date.now() },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;

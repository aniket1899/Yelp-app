const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connected to mongoDB');
  } catch (err) {
    console.log(err.message);
    //  Exit process when failed to connect
    process.exit(1);
  }
};

module.exports = connectDB;

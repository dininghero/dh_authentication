const mongoose = require('mongoose');

// const { connection, close } = require('../connection');

// connection();
// close();

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  restaurant: {
    type: String,
    required: true,
  },
  pw: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  id: {
    type: String,
    required: true,
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;

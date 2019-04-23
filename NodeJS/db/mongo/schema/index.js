const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pw: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    require: true,
  },
  tempPassword: {
    type: Boolean,
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;

const Account = require('../schema');

/**
  * Create a new account
  * @name createAccount
  * @function
  * @param {Object} user - User account schema
  * @param {String} user.email - Account email
  * @param {String} user.restaurant -  Account restaurant name
  * @param {String} user.pw - Account hashed password
  * @param {String} user.salt - Salt value added to the password before hashing
  */
const createAccount = user => Account.create(user);

/**
  * Update an account password, email or restaurant name
  * @name updateAccount
  * @function
  * @param {String} id - Account unique id
  * @param {Object} newData - Account data to update
  * @param {String} newData.key - newData.pw || newData.email || newData.restaurant
  * @param {requestCallback} cb - Callback that handles the response
  */
const updateAccount = (id, newData, cb) => Account.findByIdAndUpdate(id, newData, cb);

/**
  * Check an account email or restaurant name
  * @name checkAccount
  * @function
  * @param {Object} information - Information to find
  * @param {String} information.key - information.email || information.restaurant
  * @param {requestCallback} cb - Callback that handles the response
  */
const checkAccount = (information, cb) => Account.findOne(information, cb);

/**
  * Retreive an account based on email and pw
  * @name loginAccount
  * @function
  * @param {Object} loginData - Login information
  * @param {String} loginData.email - login email
  * @param {String} loginData.pw - login password
  * @param {requestCallback} cb - Callback that handles the response
  */
// const loginAccount = (
//   loginData,
//   cb,
// ) => Account.find({ email: loginData.email, pw: loginData.pw }, cb);

const loginAccount = (
  loginData,
  cb,
) => Account.find({ email: loginData.email }, cb);

module.exports = {
  createAccount,
  updateAccount,
  checkAccount,
  loginAccount,
};

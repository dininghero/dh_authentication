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
  * @returns {Promise} Promise object success and failure
  */
const createAccount = user => Account.create(user);

/**
  * Check an account email or restaurant name
  * @name checkAccount
  * @function
  * @param {Object} information - Information to find
  * @param {String} information.key - information.email || information.restaurant
  * @returns {Promise} Promise object represents query data
  */
const checkAccount = information => new Promise((resolve, reject) => {
  if (information.email || information.restaurant) {
    Account.findOne(information, (err, result) => {
      if (err) reject(new Error(err));
      resolve(result);
    });
  } else {
    reject(new Error('Error checkAccount: param must have email or restaurant key'));
  }
});

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

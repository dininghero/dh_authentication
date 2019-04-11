const Account = require('../schema');

/**
  * Create a new account
  * @name createAccount
  * @function
  * @param {Object} user - User account schema
  * @param {String} user.email - Account email
  * @param {String} user.firstname -  Account firstname name
  * @param {String} user.lastname -  Account lastname name
  * @param {String} user.pw - Account hashed password
  * @param {String} user.salt - Salt value added to the password before hashing
  * @returns {Promise} Promise object success and failure
  */

const createAccount = user => Account.create(user);

/**
  * Retreive an account based on email
  * @name loginAccount
  * @function
  * @param {Object} loginData - Login information
  * @param {String} loginData.email
  * @returns {Promise} Promise object represents query data
  */

const loginAccount = loginData => new Promise((resolve, reject) => {
  if (loginData.email) {
    Account.find({ email: loginData.email }, (err, result) => {
      if (err) reject(new Error(err));
      resolve(result);
    });
  } else {
    reject(new Error('Error loginAccount: param must have email key'));
  }
});

module.exports = {
  createAccount,
  loginAccount,
};

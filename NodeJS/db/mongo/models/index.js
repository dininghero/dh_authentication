const Account = require('../schema');

/**
  * Create a new user account
  * @name createAccount
  * @function
  * @param {Object} user - User account schema
  * @param {String} user.email - Account email
  * @param {String} user.restauramt -  Account restaurant name
  * @param {String} user.pw - Account hashed password
  * @param {String} user.date - Account creation date
  * @param {String} user.id - Account unique id
  */
const createAccount = user => Account.create(user);

/**
  * Update a user password
  * @name updatePw
  * @function
  * @param {String} id - Account unique id
  * @param {String} pw - Account new hashed password
  * @param {requestCallback} cb - The callback that handles the response
  */
const updatePw = (id, pw, cb) => Account.findByIdAndUpdate(id, { pw }, cb);

/**
  * Update a user email
  * @name updateEmail
  * @function
  * @param {String} id - Account unique id
  * @param {String} email - Account new email
  * @param {requestCallback} cb - The callback that handles the response
  */
const updateEmail = (id, email, cb) => Account.findByIdAndUpdate(id, { email }, cb);

/**
  * Update a user restaurant name
  * @name updateRestaurant
  * @function
  * @param {String} id - Account unique id
  * @param {String} restaurant - Account new restaurant name
  * @param {requestCallback} cb - The callback that handles the response
  */
const updateRestaurant = (id, restaurant, cb) => Account.findByIdAndUpdate(id, { restaurant }, cb);

module.exports = {
  createAccount,
  updatePw,
  updateEmail,
  updateRestaurant,
};

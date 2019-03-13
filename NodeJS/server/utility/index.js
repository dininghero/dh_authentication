const crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
 /** convert to hexadecimal format */
 /** return required number of characters */
const salt = (length) => {
  return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};

/** 
 * verifies username is not in database;
 * @function 
 * @param {string} username
*/
const verifyUsername = (username) => {
  //self explanatory on function's objective
};

/** 
 * verifies email is not in database;
 * @function 
 * @param {string} email
*/
const verifyEmail = (email) => {
  //self explanatory on function's objective
};

module.exports = {
  salt,
  verifyUsername,
  verifyEmail,
};
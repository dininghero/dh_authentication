const crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 * @return {string}
 */
 /** convert to hexadecimal format */
 /** return required number of characters */
const salt = (length) => {
  return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};

// /** 
//  * verifies username is not in database;
//  * @function 
//  * @param {string} username
//  * @return {boolean}
// */
// const verifyUsername = (username) => {
//   //do query for email in database
//   let query = null;
//   if (!query) {
//     return false;
//   };
//   return true;
// };

// /** 
//  * verifies email is not in database;
//  * @function 
//  * @param {string} email
//  * @return {boolean}
// */
// const verifyEmail = (email) => {
//   //do query for email in database
//   let query = null;

// };

/** 
 * verifies username is not in database;
 * @function 
 * @param {string} username
 * @return {boolean}
*/
const verifyContent = (searchValue) => {
  let query = null;
  if (!query) {
    return false;
  };
  return true;
};

module.exports = {
  salt,
  verifyContent,
  // verifyUsername,
  // verifyEmail,
};
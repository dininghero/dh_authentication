const crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
 /** convert to hexadecimal format */
 /** return required number of characters */
let salt = function(length){
  return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};

module.exports = {
  salt: salt,
};
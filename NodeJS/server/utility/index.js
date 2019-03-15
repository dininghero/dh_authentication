const crypto = require('crypto');
const { checkAccount } = require('../../db/mongo/models');
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

/** 
 * verifies username is not in database;
 * @function 
 * @param {string} searchValue
 * @param {string} searchValue
 * @return {boolean}
*/

const verifyContent = (searchValue) => {
  /** verification token for email and restaurants -- false == in use  */
  let ERVerification = {
    email: true,
    restaurant: true,
  };

  //query will async
  let emailQuery = checkAccount({email: searchValue.email})
  let restaurantQuery = checkAccount({restaurant: searchValue.restaurant}); // {email: name} {restaurant: name};

  if (!emailQuery) {
    ERVerification.email = false;
  };

  if (!restaurantQuery) {
    ERVerification.restaurant = false;
  };

  return ERVerification;
};

module.exports = {
  salt,
  verifyContent,
};
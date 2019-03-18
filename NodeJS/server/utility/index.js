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
 * @return {object} - object structure - {email: name@email.com, restaurant: restaurant}
*/

const verifyContent = (searchValue) => {
  /** verification token for email and restaurants -- false == in use  */
  let ERVerification = {
    email: true,
    restaurant: true,
  };

  /** List of promises to verify email and restaurant uniqueness */

  let emailQuery = new Promise((resolve, reject) => {
    let query = checkAccount({email: searchValue.email});
    resolve(query);
  });

  let restaurantQuery = new Promise((resolve, reject) => {
    let query = checkAccount({restaurant: searchValue.restaurant});
    resolve(query);
  });

  let PromiseArray = Promise.all([emailQuery, restaurantQuery]).then(result => {
    if (result[0] !== null) {
      ERVerification.email = false;
    };
    if (result[1] !== null) {
      ERVerification.restaurant = false;
    }
    return ERVerification;
  }).catch(error => {
    console.log(error);
  })
  return PromiseArray;
};

module.exports = {
  salt,
  verifyContent,
};
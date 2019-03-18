const crypto = require('crypto');
const { checkAccount } = require('../../db/mongo/models');
/**
 * generates random string of characters i.e salt
 * @function
 * @param {Number} length - Length of the random string.
 * @return {String}
 */
/** convert to hexadecimal format */
/** return required number of characters */
const salt = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

/**
 * verifies username is not in database;
 * @function
 * @param {String} searchValue
 * @param {String} searchValue
 * @return {object} - object structure - {email: name@email.com, restaurant: restaurant}
*/

const verifyContent = (searchValue) => {
  /** verification token for email and restaurants -- false == in use  */
  const ERVerification = {
    email: true,
    restaurant: true,
  };

  /** List of promises to verify email and restaurant uniqueness */

  const emailQuery = new Promise((resolve, reject) => {
    const query = checkAccount({ email: searchValue.email });
    resolve(query);
  });

  const restaurantQuery = new Promise((resolve, reject) => {
    const query = checkAccount({ restaurant: searchValue.restaurant });
    resolve(query);
  });

  const PromiseArray = Promise.all([emailQuery, restaurantQuery]).then((result) => {
    if (result[0] !== null) {
      ERVerification.email = false;
    }
    if (result[1] !== null) {
      ERVerification.restaurant = false;
    }
    return ERVerification;
  }).catch((error) => {
    console.log(error);
  });
  return PromiseArray;
};

module.exports = {
  salt,
  verifyContent,
};

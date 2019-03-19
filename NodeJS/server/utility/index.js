const crypto = require('crypto');

const { checkAccount, loginAccount } = require('../../db/mongo/models');

/**
  * Generates random string of characters i.e salt
  * @name salt
  * @function
  * @param {Number} length - Length of the random string
  * @return {String} Return required number of characters
  */
const salt = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex') // Convert to hexadecimal format
    .slice(0, length);
};

/**
  * Generates Hash Key in place of user password with the use of SHA256 since there are few advantages to using SHA392 and SHA512
  * @name encryption
  * @function
  * @param {String} password - password
  * @return {String}
  */
const encryption = (password) => {
  const algorithm = 'sha256';
  const _salt = salt(16);
  const hash = crypto.pbkdf2Sync(password, _salt, 1000, 64, algorithm).toString('hex');
  const token = {
    hash,
    salt: _salt
  };
  return token;
};

/**
  * Generates Hash Key using stored salt value
  * @name decryption
  * @function
  * @param {String} password - password
  * @param {String} salt - salt value generated when account was created
  * @return {String}
  */
const decryption = (password, salt) => {
  const algorithm = 'sha256';
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, algorithm).toString('hex');
  return hash;
};

/**
  * Check if email or restaurant are in the database
  * @name verifyContent
  * @function
  * @param {Object} searchValue
  * @param {String} searchValue.key - searchValue.email || searchValue.restaurant
  * @return {Promise} - Promise object structure: { email: Boolean, restaurant: Boolean }
  */
const verifyContent = (searchValue) => {
  /* Verification token for email and restaurants - false === in use */
  const ERVerification = {
    email: true,
    restaurant: true,
  };

  /* List of Promises to verify email and restaurant uniqueness */
  const emailQuery = checkAccount({ email: searchValue.email });
  const restaurantQuery = checkAccount({ restaurant: searchValue.restaurant });

  return Promise.all([emailQuery, restaurantQuery])
    .then((result) => {
      if (result[0] !== null) {
        ERVerification.email = false;
      }
      if (result[1] !== null) {
        ERVerification.restaurant = false;
      }
      return ERVerification;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * verifies username is not in database;
 * @function
 * @param {Object} credentials - object structure - {email: entry, password: entry}
 * @return {Object} - valid
 * @return {String} - invalid
*/
const verifyPassword = (credentials) => {
  return new Promise((resolve, reject) => {
    const search = loginAccount(credentials);
    resolve(search);
  }).then((result) => {
    return result[0];
  }).then((result) => {
    const decrypt = decryption(credentials.pw, result.salt);
    if (decrypt === result.pw) {
      return result;
    } else {
      return 'FAILED';
    }
  });
};

module.exports = {
  salt,
  verifyContent,
  verifyPassword,
  encryption,
  decryption,
};

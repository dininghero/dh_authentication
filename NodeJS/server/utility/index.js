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
  * generates random string of characters i.e salt
  * @name encryption
  * @function
  * @param {String} saltedPassword - password + salt
  * @param {String} unsaltedPassword - no salt password
  * @return {String}
  */
const encryption = (saltedPassword, unsaltedPassword) => {
  const algorithm = 'aes-256-cbc';
  const cipher = crypto.createCipher(algorithm, saltedPassword);
  let encrypt = cipher.update(unsaltedPassword, 'utf8', 'hex');
  encrypt += cipher.final('hex');
  return encrypt;
};

/**
  * generates random string of characters i.e salt
  * @name decryption
  * @function
  * @param {String} saltedPassword - password + salt
  * @param {String} cipher - cipher string
  * @return {String}
  */
const decryption = (saltedPassword, cipher) => {
  const algorithm = 'aes-256-cbc';
  const decipher = crypto.createDecipher(algorithm, saltedPassword);
  let decrypt = decipher.update(cipher, 'hex', 'utf8');
  decrypt += decipher.final('utf8');
  return decrypt;
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
    const saltedPassword = credentials.pw + result.salt;
    const encrypted = encryption(saltedPassword, credentials.pw);
    if (encrypted === result.pw) {
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

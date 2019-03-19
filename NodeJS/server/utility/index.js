const crypto = require('crypto');
const { checkAccount, loginAccount } = require('../../db/mongo/models');
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
 * generates random string of characters i.e salt
 * @function
 * @param {String} saltedPassword - password + salt 
 * @param {String} unsaltedPassword - no salt password
 * @return {String}
 */
const encryption = (saltedPassword, unsaltedPassword) => {
  const algorithm = 'aes-256-cbc';
  let cipher = crypto.createCipher(algorithm, saltedPassword);
  let encrypt = cipher.update(unsaltedPassword, 'utf8', 'hex');
  encrypt += cipher.final('hex');
  return encrypt;
};

 /**
 * generates random string of characters i.e salt
 * @function
 * @param {String} saltedPassword - password + salt
 * @param {String} cipher - cipher string
 * @return {String}
 */
const decryption = (saltedPassword, cipher) => {
  const algorithm = 'aes-256-cbc';
  let decipher = crypto.createDecipher(algorithm, saltedPassword);
  let decrypt = decipher.update(cipher, 'hex', 'utf8');
  decrypt += decipher.final('utf8');
  return decrypt;
};

/**
 * verifies username is not in database;
 * @function
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

/**
 * verifies username is not in database;
 * @function
 * @param {Object} credentials - object structure - {email: entry, password: entry}
 * @return {Object} - valid
 * @return {String} - invalid
*/
const verifyPassword = (credentials) => {
  return new Promise ((resolve, reject) => {
    let search = loginAccount(credentials);
    resolve(search);
  }).then(result => {
    return result[0];
  }).then(result => {
    let saltedPassword = credentials.pw + result.salt;
    const encrypted = encryption(saltedPassword, credentials.pw);
    if (encrypted === result.pw) {
      return result;
    } else {
      return 'FAILED';
    }
  })
};

module.exports = {
  salt,
  verifyContent,
  verifyPassword,
  encryption,
  decryption,
};

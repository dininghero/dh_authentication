const { checkAccount, loginAccount } = require('../../db/mongo/models');
const { _crypto } = require('./crypto');

/**
  * Check if email or restaurant are in the database
  * @name verifyContent
  * @function
  * @param {Object} searchValue
  * @param {String} - searchValue.email || searchValue.restaurant
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
  * Verifies username is in database and then check password
  * @name verifyPassword
  * @function
  * @param {Object} credentials
  * @param {String} credentials.email
  * @param {String} credentials.password
  * @return {Promise} - Promise object structure: Boolean || null
  */
const verifyPassword = credentials => new Promise((resolve, reject) => {
  loginAccount(credentials)
    .then((account) => {
      if (account.length === 0) {
        // email not found in DB
        resolve(null);
      }
      return account[0];
    })
    .then((result) => {
      const decrypt = new _crypto(credentials.pw);
      // check if decrypt pw === pw
      resolve(decrypt.decryption(credentials.pw, result.salt) === result.pw);
    })
    .catch((err) => {
      reject(err);
    });
});

// make a function to change secret keys
/**
 * After a set amount of time, secret keys will rotate and a new JWT token will need to created
 * @function
 * @return {String} - new key thay has been selected to be used
*/
const rotateKeys = () => {

};

module.exports = {
  verifyContent,
  verifyPassword,
};

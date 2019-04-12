const { loginAccount } = require('../../db/mongo/models');
const { Crypto } = require('./crypto');

/**
  * Check if email is in the database
  * @name verifyContent
  * @function
  * @param {Object} emailToVerify
  * @param {String} emailToVerify.email
  * @return {Promise} - Promise object structure: Boolean
  */

const verifyContent = emailToVerify => new Promise((resolve, reject) => {
  loginAccount(emailToVerify)
    .then((account) => {
      if (account.length === 0) {
        resolve(true);
      }
      resolve(false);
    })
    .catch((err) => {
      reject(err);
    });
});

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
      const decrypt = new Crypto(credentials.pw);
      // check if decrypt pw === pw
      resolve(decrypt.decryption(credentials.pw, result.salt) === result.pw);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = {
  verifyContent,
  verifyPassword,
};

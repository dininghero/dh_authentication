const crypto = require('crypto');

/**
  * Class for salting, encrypting, and decrypting user passwords for authentication
  * @class
  *
  * @method salt
  * @param {Number} length - Length of the random string
  * @return
  *
  * @method encryption
  * @param {String} password - User password
  * @return
  *
  * @method decryption
  * @param {String} password - User password
  * @param {String} salt - Stored salt value
  * @return
  */

exports._crypto = class Crypto {
  salt(length) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex') // Convert to hexadecimal format
      .slice(0, length);
  }

  encryption(password) {
    const algorithm = 'sha256';
    const _salt = this.salt(16);
    const hash = crypto.pbkdf2Sync(password, _salt, 1000, 64, algorithm).toString('hex');
    const token = {
      hash,
      salt: _salt,
    };
    return token;
  }

  decryption(password, salt) {
    const algorithm = 'sha256';
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, algorithm).toString('hex');
    return hash;
  }
};

const crypto = require('crypto');

const { checkAccount, loginAccount } = require('../../db/mongo/models');

/**
 * Class for salting, encrypting, and decrypting user passwords for authentication
 * @name _crypto
 * @function
 * @constructor
 * @method salt
 * @param {Number} length - Length of the random string
 * @method encryption
 * @param {String} - user password
 * @method decryption
 * @param {String} - user password
 * @param {String} - stored salt value
 */
const _crypto = class Crypto {
  constructor() {
  }

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
      salt: _salt
    };
    return token;
  }

  decryption(password, salt) {
    const algorithm = 'sha256';
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, algorithm).toString('hex');
    return hash;
  }
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
 * @class
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
    // const decrypt = decryption(credentials.pw, result.salt);
    const decrypt = new _crypto(credentials.pw);
    // if (decrypt === result.pw) {
    if (decrypt.decryption(credentials.pw, result.salt) === result.pw) {
      return result;
    } else {
      return 'FAILED';
    }
  });
};

//make a function to change secret keys
/** 
 * After a set amount of time, secret keys will rotate and a new JWT token will need to created  
 * @function
 * @return {String} - new key thay has been selected to be used
*/
const rotateKeys = () => {
  
};

/** 
 * Creates Json Web Token with base64UrlEncode Header, Payload, Signature
 * @class
 * @constructor
 * 
 * @method addAlgorithm - adds type of algorithm to the header
 * @param {String} algorithm 
 * @return {Object}
 * 
 * @method addEmail - adds email to payload
 * @param {String} email 
 * @return {Object}
 * 
 * @method addAdminstratorStatus - adds whether or not user has credentials for admin to payload
 * @param {Boolean}
 * @return {Object}
 * 
 * @method addAccessScopes - adds scopes of use that a user has access to to the payload
 * @param {Add-Value-Here} SomeValue
 * @return {Array}
 * 
 * @method addExpiration - adds expiration date and time for the Json Web Token and when log-in credentials will be necessary for a new issued token
 * @param {Number} time
 * @return {String}
 * 
 * @method base64toBase64Url - converts base64 to base64url
 * @param {String} string
 * @return {String}
 * 
 * @method generateSignedToken - generates a base64UrlEncoded Json Web Token 
 * @param {Object} header
 * @param {Object} payload
 * @param {String} key - secret key 
 * @return {String} - base64UrlEncoded Json Web Token 
 */
const JsonWebToken = class JWT {
  constructor() {
    this.header = {
      typ: 'JWT'
    };
    this.payload = {
      iss: 'https://www.dininghero.com',
      iat: new Date(),
      xsrfToken: ''
    };
    this.base64Token;
    this.base64UrlJWT;
  }
  /** adds specified algorithm to the header */
  addAlgorithm(algorithm) {
    this.header.alg = algorithm;
    return this.header;
  };

  /** adds email to payload */
  addEmail(email) {
    this.payload.email = email;
    return this.payload;
  };

  /** adds administrator status to payload */
  addAdministratorStatus(boolean) {
    this.payload.admin = boolean;
    return this.payload;
  };

  /** adds scopes which the user as access to based on their credentials */
  addAccessScopes(someValue) {
    // needs to be defined
    let scopes = [];
    return scopes;
  };

  /** adds expiration date which token will no longer be valid  */
  addExpiration(time) {
    const date = new Date();
    date.setDate(date.getDate() + time);
    this.payload.exp = date;
    return this.payload;
  };

  //converts base64 to base64UrlEncoded - remove all /+= and replaced with Url safe chars
  base64toBase64Url(string) {
    return string.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
  };

  //generates base64 encoded signed JWT 
  generateSignedToken(header, payload, key) {
    const algorithm = 'SHA256';
    const secretKey = 'THIS_KEY_IS_SECRET';
    const H64 = this.base64toBase64Url(Buffer.from(JSON.stringify(header)).toString('base64'));
    const P64 = this.base64toBase64Url(Buffer.from(JSON.stringify(payload)).toString('base64'));
  
    const unsignedToken = `${H64}.${P64}`;
    const signature = crypto.createHmac(algorithm, secretKey).update(unsignedToken).digest('base64');
    this.base64UrlToken = this.base64toBase64Url(`${unsignedToken}.${signature}`);

    return this.base64UrlToken;
  };
};

module.exports = {
  verifyContent,
  verifyPassword,
  _crypto,
  JsonWebToken,
};

const crypto = require('crypto');

/**
  * Creates Json Web Token with base64UrlEncode Header, Payload, Signature
  * @class
  *
  * @method addAlgorithm - Adds type of algorithm to the header
  * @param {String} algorithm
  * @return {Object}
  *
  * @method addEmail - Adds email to payload
  * @param {String} email
  * @return {Object}
  *
  * @method addAdminstratorStatus - Adds whether or not user has credentials for admin to payload
  * @param {Boolean}
  * @return {Object}
  *
  * @method addAccessScopes - Adds scopes of use that a user has access to to the payload
  * @param {Add-Value-Here} SomeValue
  * @return {Array}
  *
  * @method addExpiration - Adds expiration date and time for the Json Web Token
  *                         and when log-in credentials will be necessary for a new issued token
  * @param {Number} time
  * @return {String}
  *
  * @method base64toBase64Url - Converts base64 to base64url
  * @param {String} string
  * @return {String}
  *
  * @method generateSignedToken - Generates a base64UrlEncoded Json Web Token
  * @param {Object} header
  * @param {Object} payload
  * @param {String} key - Secret key
  * @return {String} - Base64UrlEncoded Json Web Token
  */

exports.JsonWebToken = class JWT {
  constructor() {
    this.header = {
      typ: 'JWT',
    };
    this.payload = {
      iss: 'https://www.dininghero.com',
      iat: new Date(),
      xsrfToken: '',
    };
  }

  /** Adds specified algorithm to the header */
  addAlgorithm(algorithm) {
    this.header.alg = algorithm;
    return this.header;
  }

  /** Adds email to payload */
  addEmail(email) {
    this.payload.email = email;
    return this.payload;
  }

  /** Adds administrator status to payload */
  addAdministratorStatus(boolean) {
    this.payload.admin = boolean;
    return this.payload;
  }

  /** Adds scopes which the user as access to based on their credentials */
  addAccessScopes(someValue) {
    // needs to be defined
    let scopes = [];
    return scopes;
  }

  /** Adds expiration date which token will no longer be valid  */
  addExpiration(time) {
    const date = new Date();
    date.setDate(date.getDate() + time);
    this.payload.exp = date;
    return this.payload;
  }

  /**  Converts base64 to base64UrlEncoded - remove all /+= and replaced with Url safe chars */
  base64toBase64Url(string) {
    return string.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
  }

  /**  Generates base64 encoded signed JWT */
  generateSignedToken(header, payload, key) {
    const algorithm = 'SHA256';
    const secretKey = 'THIS_KEY_IS_SECRET';
    const H64 = this.base64toBase64Url(Buffer.from(JSON.stringify(header)).toString('base64'));
    const P64 = this.base64toBase64Url(Buffer.from(JSON.stringify(payload)).toString('base64'));

    const unsignedToken = `${H64}.${P64}`;
    const signature = crypto.createHmac(algorithm, secretKey).update(unsignedToken).digest('base64');
    this.base64UrlToken = this.base64toBase64Url(`${unsignedToken}.${signature}`);

    return this.base64UrlToken;
  }
};
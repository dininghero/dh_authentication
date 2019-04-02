const crypto = require('crypto');

/** 
 * Function will generate a random csrf token 
 * @class
 * @constructor
 * 
 * @method generateToken - generates 256 bit random crypto strong string to serve as a csrf value
 * @param {Number} - length of character string to be outputed 
 * @return {String} - string w/ length of input
 * 
 * @method setExpiry - generates an expiration date 24 hours after creation of the token 
 * @return {String} - date 
 */

exports.csrfToken = class CsrfToken {
  constructor() {
    this.token = {};
  };

  generateToken(length) {
    this.token.access_token = crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex') // Convert to hexadecimal format
      .slice(0, length);
    return this.token.access_token;
  };
  
  setExpiry() {
    // const today = new Date().setDate(new Date().getDate() + 1);
    // const today = new Date(Date.now() + 900000);
    const today = 900000 + Date.now();
    this.token.expiration = today;
    return this.token.expiration;
  }
};
const crypto = require('crypto');
const atob = require('atob');

/**
  * Decode base64UrlEncoded String to base64
  * @function
  * @constructor
  *
  * @method authenticateJWT - verifies that the token is valid and has not been altered
  * @param {String} JsonWebToken
  * @param {String} key
  * @return {Boolean} - true or false whether it's verified
  *
  * @method verifyExpiration - verifies validity of expiration
  * @param {Object} unsignedToken
  * @return {Boolean} - true is expired
  *
  * @method convertBase64
  * @param {String} string
  * @return {String}
  *
  * @method decodeBase64Url
  * @param {String} JsonWebToken
  * @return {String}
  *
  * @method ReadJsonWebToken - break base64 token back into JSON.
  * @param {String} decodebase64
  * @return {Object}
  */

exports.DecodeJsonWebToken = class decodeJWT {
  constructor() {
    this.token = {};
    this.verified = false;
    this.flag = false;
  }

  /** Verify Token Authenticity */
  authenticateJWT(JsonWebToken, key) {
    const algorithm = 'SHA256';
    const JWT = JsonWebToken.split('.');
    const unsignedToken = `${JWT[0]}.${JWT[1]}`;
    const signatureVerification = crypto.createHmac(algorithm, key).update(unsignedToken).digest('base64');
    const base64UrlSignature = this.convertBase64(signatureVerification);
    if (base64UrlSignature === JWT[2]) {
      this.verified = true;
      return this.verified;
    }
    return this.verified;
  }

  /** Verifies validity of the expiration time stamp */
  verifyExpiration(unsignedToken) {
    const expiration = JSON.parse(unsignedToken.payload).exp;
    const today = JSON.stringify(new Date());
    const alteredExp = expiration.replace(/([-T:])/gi, '*');
    const alterToday = today.replace(/([-T:])/gi, '*');
    const chunksExp = alteredExp.split('*');
    const chunksToday = alterToday.split('*');

    /** Remove last part of date */
    chunksExp.pop();
    chunksToday.pop();

    /** Iterate thru all and see if any values are greater in today's date
       - if true, return true -  else return false */
    for (let i = 0; i < chunksExp.length; i += 1) {
      if (parseInt(chunksToday[i]) > parseInt(chunksExp[i])) {
        this.flag = true;
        return this.flag;
      }
    }
    return this.flag;
  }

  /** Converts base64 to base64UrlEncoded - remove all /+= and replaced with Url safe chars */
  convertBase64(string) {
    return string.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
  }

  /** Decode base64url to base64 */
  decodeBase64Url(JsonWebToken) {
    let jwtToken = JsonWebToken;
    jwtToken = (`${jwtToken}===`).slice(0, jwtToken.length + (jwtToken.length % 4));
    return jwtToken.replace(/-/g, '+').replace(/_/g, '/');
  }

  /** Converting base64 to Javascript Object */
  readJsonWebToken(decodedbase64) {
    const JWT = decodedbase64.split('.');
    this.token.header = atob(JWT[0]);
    this.token.payload = atob(JWT[1]);
    return this.token;
  }
};

// Logic for express **************** decoding

// const decodeToken = new decodeJsonWebToken();
// if (decodeToken.authenticateJWT(JSONWebToken.base64UrlToken)) {
//   const parsedJWT =
// decodeToken.readJsonWebToken(decodeToken.decodeBase64Url(JSONWebToken.base64UrlToken));
//   const expired = decodeToken.verifyExpiration(parsedJWT);

//   if (expired) {
//     res.status(401).send({
//       response: 'Unauthorized.'
//     });
//   } else {
//     res.status(200).send({
//       response: 'some response' //fill in
//     });
//   }
// } else {
//   res.status(401).send({
//     response: 'Unauthorized.'
//   });
// };

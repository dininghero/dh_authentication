const express = require('express');
const cookieParser = require('cookie-parser');

const { CsrfToken } = require('../utilities/csrfGenerator');

const cookie = express.Router();

/** Middleware route which checks and validates cookies to protect against CSRF Attacks */

// Parse cookies
cookie.use(cookieParser());

cookie.use((req, res, next) => {
  // if cookie value is doesn't exist, make a cookie and pass it to the next route
  if (JSON.stringify(req.cookies) === '{}' || JSON.stringify(req.signedCookies) === '{}') {
    /** instantiate csrf token */
    const csrf = new CsrfToken();

    /** configure cookie to be sent to user with httpOnly enabled - only this APi will
    be able to translate the contents of the cookie and not the javascript in the browser */

    /** generate 256 bit CSPRNG value */
    const csrf_token = csrf.generateToken(32);

    /** setting csrf as a variable for this particular instance of res so it can
    be passed down the chain when next() is invoked */
    res.locals.csrf = csrf_token;

    res.cookie('access_token', csrf_token, {
      expires: csrf.setExpiry(),
      httpOnly: false,
      maxAge: 86400000, /* 24 hours */
      // secure: true, // uncomment when portal is changed to HTTPS
    }); 

    res.set('X-CSRF-TOKEN', csrf_token);
  }

  /** handle user log out requests */
  if (req.originalUrl.toLowerCase() === '/ralo') {
    res.clearCookie('access_token');
  }
  
  next();
});

module.exports = cookie;

const express = require('express');
const cookieParser = require('cookie-parser');

const { csrfToken } = require('../utilities/csrfGenerator');

const cookie = express.Router();

/** Middleware route which checks and validates cookies to protect against CSRF Attacks */

// Parse cookies
cookie.use(cookieParser());

cookie.use((req, res, next) => {
  // const _cookie = req.cookie;
  // if (_cookie === undefined) {
  // if cookie value is doesn't exist, make a cookie and pass it to the next route
  if (JSON.stringify(req.cookies) === '{}' || JSON.stringify(req.signedCookies) === '{}') {
    /** instantiate csrf token */
    const csrf = new csrfToken();

    /** configure cookie to be sent to user with httpOnly enabled - only this APi will
    be able to translate the contents of the cookie and not the javascript in the browser */

    /** generate 256 bit CSPRNG value */
    const csrf_token = csrf.generateToken(32);

    res.cookie('access_token', csrf_token, {
      expires: csrf.setExpiry(),
      httpOnly: true,
      maxAge: 86400000, /* 24 hours */
      secure: true,
    });

    res.set('X-CSRF-TOKEN', csrf_token);
  }

  /** handle user log out requests */
  if (req.originalUrl.toLowerCase() === '/ralo') {
    // res.clearCookie(req.cookies);
    // res.clearCookie(req.signedCookies);
  }
  next();
});

module.exports = cookie;
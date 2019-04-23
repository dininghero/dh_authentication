const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fill_me_in',
    password: 'fill_me_in',
  }
});

/** 
 * @function
 * @return {Boolean} true is success
*/
exports.sendEmail = (email, randomPassword) => {
  const mailOptions = {
    from: 'fill_me_in',
    to: email,
    subject: 'Password Reset Requested',
    html: `<h1>Password Recovery</h1>\n<p>New Temporary Password: ${randomPassword}</p>`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  })
};
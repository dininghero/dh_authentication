/**
 * generates bias random character set password
 * @function
 * @param {Number} length 
 * @return {String} 
 */

exports.randomPasswordGenerator = length => {
  const characterSet = 'abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; n = characterSet.length, i < length; i++) {
    password += characterSet.charAt(Math.floor(Math.random() * n));
  }
  return password;
};


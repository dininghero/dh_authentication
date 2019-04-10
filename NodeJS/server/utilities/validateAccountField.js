/** 
 * This class validates the information that is being passed before inserting into database and constructs an object with boolean values. 
 * @class
 * @constructor
 * 
 * @method validatePassword
 * @param { String } - password value
 * 
 * @method validateEmail
 * @param { String } - email value
 * 
 * @method validateName
 * @param { String } - name value
 * @param { String } - type - first or last 
*/

exports.validateAccountForms = class ValidateAccountForms {
  constructor() {
    this.pw = false;
    this.firstName = false;
    this.lastName = false;
    this.email = false;
  }

  validatePassword(value) {
    const len = value.length >= 8;
    const digit = value.match(/([0-9])/gi);
    const specialChar = value.match(/([~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?])/gi);
    const removeNonChar = value.replace(/[0-9~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/gi, '');
    let uppercase = null;
    let lowercase = null;

    for (let i = 0; i < removeNonChar.length; i++) {
      if (removeNonChar[i].toUpperCase() === removeNonChar[i]) {
        uppercase = 'OK';
        if (uppercase && lowercase) {
          break;
        } else {
          continue;
        }
      } else {
        lowercase = 'OK';
        if (uppercase && lowercase) {
          break;
        } else {
          continue;
        }
      }
    };

    if (len && uppercase && lowercase && digit && specialChar) {
      this.pw = true;
    }
  }

  validateEmail(value) {
    const checkEmail = value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/gi);
    if (checkEmail) {
      this.email = true;
    }
  }

  validateName(value, type) {
    const digit = value.match(/([0-9])/gi);
    const specialChar = value.match(/([~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?])/gi);
    switch(type) {
      case 'first':
      if (!digit && !specialChar) {
        this.firstName = true;
      }
      case 'last': 
      if (!digit && !specialChar) {
        this.lastName = true;
      }
    }
  }
};
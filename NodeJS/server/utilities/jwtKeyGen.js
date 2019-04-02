require('dotenv').config({ path: '../../.env', debug: process.env.DEBUG });
const fs = require('fs');

/**
  * @class
  *
  * @method daysInMonth - Gets number of days in a particular month
  * @param {Number} year
  * @param {Number} month
  * @return {Number} - Days in a month
  *
  * @method generateRandomInclusive - Generates a random number that is inclusive of the min and max
  * @param {Number} min
  * @param {Number} max
  * @return {Number}
  *
  * @method writeToFile - Deletes existing data in .env file and rewrites
  *                       it to change current key and date changed
  * @param {String} key
  *
  * @method keyGeneration - Validates key and generates new key if necessary
  * @param {String} currentKey
  * @param {String} dateGenerated
  * @param {Number} expirationTime - Days til expiration
  * @return {String} - New key or old key
  */

exports.KeyValidation = class KeyVal {
  daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  generateRandomInclusive(min, max) {
    /** The maximum is inclusive and the minimum is inclusive */
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateNewKey(currentKey) {
    const keyArray = [
      process.env.SECRET_KEY_1,
      process.env.SECRET_KEY_2,
      process.env.SECRET_KEY_3,
      process.env.SECRET_KEY_4,
      process.env.SECRET_KEY_5,
      process.env.SECRET_KEY_6,
      process.env.SECRET_KEY_7,
      process.env.SECRET_KEY_8,
      process.env.SECRET_KEY_9,
      process.env.SECRET_KEY_10,
    ];

    const key = currentKey;
    const randomInt = this.generateRandomInclusive(0, keyArray.length);

    if (currentKey === keyArray[randomInt]) {
      return this.generateNewKey(key);
    }
    return keyArray[randomInt];
  }

  writeToFile(key) {
    fs.readFile('../../.env', 'utf8', (err, data) => {
      if (err) throw err;

      const index = data.indexOf('DATE_GENERATED');
      const keptData = data.slice(0, index);
      const newEntry = `${keptData}DATE_GENERATED=${new Date().toISOString()}\nCURRENT_KEY=${key}`;

      fs.unlink('../../.env', (errUnlink) => {
        if (errUnlink) throw errUnlink;
      });

      fs.writeFile('../../.env', newEntry, (errWriteFile) => {
        if (errWriteFile) throw errWriteFile;
      });
    });
  }

  keyGeneration(currentKey, dateGenerated, expirationTime) {
    let newKey;

    /** Date format - International Standard */
    const currentDate = JSON.stringify(new Date()).replace(/([-T:])/gi, '*').replace(/(["])/gi, '');
    const prevDate = dateGenerated.replace(/([-T:])/gi, '*');
    const currentDateArray = currentDate.split('*');
    const prevDateArray = prevDate.split('*');
    const currDaysInMonth = this.daysInMonth(parseInt(currentDateArray[0]), parseInt(currentDateArray[1]));
    const prevDaysInMonth = this.daysInMonth(
      parseInt(prevDateArray[0]),
      parseInt(prevDateArray[1])
    );
    const intConverted = {
      currDay: parseInt(currentDateArray[2]),
      prevDay: parseInt(prevDateArray[2]),
      currMo: parseInt(currentDateArray[1]),
      prevMo: parseInt(prevDateArray[1]),
      currYr: parseInt(currentDateArray[0]),
      prevYr: parseInt(prevDateArray[0]),
    };

    /** Check years */
    if (currentDateArray[0] === prevDateArray[0]) {
      /** Check months */
      if (currentDateArray[1] === prevDateArray[1]) {
        const difference = intConverted.currDay - intConverted.prevDay;

        if (difference > expirationTime) {
          newKey = this.generateNewKey(currentKey);
          this.writeToFile(newKey);
          return newKey;
        } else {
          return currentKey;
        }
      } else {
        const elapsedMos = intConverted.currMo - intConverted.prevMo;

        /** If more than one month difference we can assume 28 days have elapsed and need to gen a new key */
        if (elapsedMos > 1) {
          newKey = this.generateNewKey(currentKey);
          this.writeToFile(newKey);
          return newKey;
        } else {
          /** One month difference */
          const remainderLastMo = prevDaysInMonth - intConverted.prevDay;
          if (remainderLastMo + intConverted.currDay > expirationTime) {
            newKey = this.generateNewKey(currentKey);
            this.writeToFile(newKey);
            return newKey;
          } else {
            return currentKey;
          }
        }
      }
    } else {
      /** Handles dec-jan dates */
      if (intConverted.currMo === 1 && intConverted.prevMo === 12) {
        if (intConverted.currDay + (prevDaysInMonth - intConverted.prevDay) > expirationTime) {
          newKey = this.generateNewKey(currentKey);
          this.writeToFile(newKey);
          return newKey;
        } else {
          return currentKey;
        }
      } else {
        newKey = this.generateNewKey(currentKey);
        this.writeToFile(newKey);
        return newKey;
      }
    }
  }
};

require('dotenv').config({ path: '../../.env', debug: process.env.DEBUG });
const fs = require('fs');

const daysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const generateRandomInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

const generateNewKey = (currentKey) => {
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
  const randomInt = generateRandomInclusive(0, keyArray.length);

  if (currentKey === keyArray[randomInt]) {
    console.log('collosion');
    console.log(keyArray[randomInt]);
    return generateNewKey(key);
  } else {
    console.log('passed');
    console.log(keyArray[randomInt]);
    return keyArray[randomInt];
  }
};

const writeToFile = (key) => {
  fs.readFile('../../.env', 'utf8', (err, data) => {
    if (err) throw err;

    const index = data.indexOf('DATE_GENERATED');
    const keptData = data.slice(0, index);
    const newEntry = `${keptData}DATE_GENERATED=${new Date().toISOString()}\nCURRENT_KEY=${key}`;

    fs.unlink('../../.env', err => {
      if (err) throw err;
    });

    fs.writeFile('../../.env', newEntry, err => {
      if (err) throw err;
    });
  });
};

// make a function to change secret keys
/**
 * After a set amount of time, secret keys will rotate and a new JWT token will need to created
 * @function
 * @param {String} currentKey - current key that is being used
 * @param {String} dateGenerated - date that current key was implemented
 * @param {Number} expirationTime - days until next key must generated
 * @return {String} - new key that has been selected to be used or same key
*/
const keyGen = (currentKey, dateGenerated, expirationTime) => {
  let newKey;

  /** date format - International Standard */
  const currentDate = JSON.stringify(new Date()).replace(/([-T:])/gi, '*').replace(/(["])/gi, '');
  const prevDate = dateGenerated.replace(/([-T:])/gi, '*');
  const currentDateArray = currentDate.split('*');
  const prevDateArray = prevDate.split('*');
  const currDaysInMonth = daysInMonth(parseInt(currentDateArray[0]), parseInt(currentDateArray[1]));
  const prevDaysInMonth = daysInMonth(parseInt(prevDateArray[0]), parseInt(prevDateArray[1]));
  const intConverted = {
    currDay: parseInt(currentDateArray[2]),
    prevDay: parseInt(prevDateArray[2]),
    currMo: parseInt(currentDateArray[1]),
    prevMo: parseInt(prevDateArray[1]),
    currYr: parseInt(currentDateArray[0]),
    prevYr: parseInt(prevDateArray[0]),
  };

  /** check years */
  if (currentDateArray[0] === prevDateArray[0]) {
    /** check months */
    if (currentDateArray[1] === prevDateArray[1]) {
      let difference = intConverted.currDay - intConverted.prevDay;

      if (difference > expirationTime) {
        newKey = generateNewKey(currentKey);
        writeToFile(newKey);
      } else {
        return currentKey;
      }
    } else {
      let elapsedMos = intConverted.currMo - intConverted.prevMo;

      /** if more than one month difference we can assume 28 days have elapsed and need to gen a new key */
      if (elapsedMos > 1) {
        newKey = generateNewKey(currentKey);
        writeToFile(newKey);
      } else {
        /** one month difference */
        let remainderLastMo = prevDaysInMonth - intConverted.prevDay;
        if (remainderLastMo + intConverted.currDay > expirationTime) {
          newKey = generateNewKey(currentKey);
          writeToFile(newKey);
        } else {
          return currentKey;
        }
      }
    }
  } else {
    /** handles dec-jan dates */
    if (intConverted.currMo === 1 && intConverted.prevMo === 12) {
      if (intConverted.currDay + (prevDaysInMonth - intConverted.prevDay) > expirationTime) {
        newKey = generateNewKey(currentKey);
        writeToFile(newKey);
      } else {
        return currentKey;
      }
    } else {
      newKey = generateNewKey(currentKey);
      writeToFile(newKey);
    }
  };
};

keyGen(process.env.CURRENT_KEY, process.env.DATE_GENERATED, 7);
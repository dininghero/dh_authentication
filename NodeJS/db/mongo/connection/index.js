const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017/dininghero';

const options = {
  useNewUrlParser: true,
  reconnectTries: 60, // retry to connect for 60 times
  reconnectInterval: 1000, // wait 1 second before retrying
};

const db = mongoose.connection;

/**
  * Create MongoDB connection and log connection events
  * @name connection
  * @function
  */
const connection = () => {
  mongoose.connect(dbURL, options);

  db.on('connecting', () => console.log(`MongoDB is connecting: ${dbURL}`));

  db.on('connected', () => console.log(`MongoDB is connected: ${dbURL}`));

  db.on('error', err => console.log(`MongoDB error: ${err}`));

  db.on('disconnecting', () => console.log('MongoDB is disconnecting!'));

  db.on('disconnected', () => console.log('MongoDB is disconnected!'));

  db.on('reconnected', () => console.log(`MongoDB is reconnected: ${dbURL}`));

  db.on('reconnectFailed', () => console.log('MongoDB reconnected failed, run out of reconnectTries'));

  db.on('timeout', err => console.log(`MongoDB timeout: ${err}`));

  db.on('close', () => console.log('MongoDB connection closed'));
};

/**
 * Close the MongoDB connection
 * @name close
 * @function
 */
const close = () => {
  db.close(() => {
    console.log('MongoDB disconnected on app termination');
    process.exit(0);
  });
};

module.exports = {
  connection,
  close,
};

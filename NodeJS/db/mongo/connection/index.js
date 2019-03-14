const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017/dininghero';

const options = {
  useNewUrlParser: true,
  reconnectTries: 60, // retry to connect for 60 times
  reconnectInterval: 1000, // wait 1 second before retrying
};

const db = mongoose.connection;

// Create the database connection
const connection = () => {
  mongoose.connect(dbURL, options);

  // Connection Events:

  db.on('connecting', () => console.log(`mongodb is connecting: ${dbURL}`));

  db.on('connected', () => console.log(`mongodb is connected: ${dbURL}`));

  db.on('error', err => console.log(`mongodb error: ${err}`));

  db.on('disconnecting', () => console.log('mongodb is disconnecting!'));

  db.on('disconnected', () => console.log('mongodb is disconnected!'));

  db.on('reconnected', () => console.log(`mongodb is reconnected: ${dbURL}`));

  db.on('reconnectFailed', () => console.log('mongodb reconnected failed, run out of reconnectTries'));

  db.on('timeout', err => console.log(`mongodb timeout: ${err}`));

  db.on('close', () => console.log('mongodb connection closed'));
};

const close = () => db.close();

module.exports = {
  connection,
  close,
};

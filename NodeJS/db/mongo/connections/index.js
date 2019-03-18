const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017/dininghero';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  reconnectTries: 60,
  reconnectInterval: 1000,
};

/**
* Close the MongoDB connection
* @name terminate
* @function
*/
const terminate = () => {
  mongoose.connection
    .close(() => {
      console.log('MongoDB disconnected on app termination');
      process.exit(0);
    });
};

/**
  * Create MongoDB connection and log connection events
  * @name connect
  * @function
  * @param {requestCallback} cb - Callback that start node server when the connection is successful
  */
exports.connect = (cb) => {
  mongoose.connection
    .on('connected', () => console.log(`MongoDB is connected: ${dbURL}`))
    .on('error', err => console.log(`MongoDB error: ${err}`))
    .on('disconnected', () => console.log('MongoDB is disconnected!'))
    .on('reconnected', () => console.log(`MongoDB is reconnected: ${dbURL}`))
    .on('reconnectFailed', () => console.log('MongoDB reconnected failed, run out of reconnectTries'))
    .on('timeout', err => console.log(`MongoDB timeout: ${err}`))
    .on('close', () => console.log('MongoDB connection closed'))
    .once('open', cb);

  /**
    * Fire terminate when Node.js process receives termination signal
    */
  process
    .on('SIGINT', terminate)
    .on('SIGTERM', terminate);

  return mongoose.connect(dbURL, options);
};

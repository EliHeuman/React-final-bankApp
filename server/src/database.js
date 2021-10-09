const mongoose = require('mongoose');
const User = require('./models/user.model');

const connection = 'mongodb://172.24.0.2:27017/bankApp';

const connectDb = () => {
  return mongoose.connect(connection, {  useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connectDb;

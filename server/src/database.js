const mongoose = require('mongoose');
const User = require('./models/user.model');

// const connection = 'mongodb://fc6c2345427d:27017/bankApp';
const connection = 'mongodb://36df8ef818ba:27017/bankApp';
const connectDb = () => {
  return mongoose.connect(connection, {  useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connectDb;

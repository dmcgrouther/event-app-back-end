const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/:27017/event-app';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected..'))
.catch((err) => console.log(`MongoDB connection error: ${err}`));


module.exports = {
    Event: require('./Event'),
    User: require('./User'),
  };
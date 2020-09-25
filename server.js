const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/event-app', { useNewUrlParser: true });

const db = require(`./models`);
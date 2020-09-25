const mongoose = require('mongoose');
const Schema = mongoose.Schema

const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
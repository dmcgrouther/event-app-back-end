const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    dateJoined: {
        type: Date,
        default: Date.now,
    },
    contactInfo: {
        type: String
    },
    usersEventsAsAttendee: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    eventsUserIsHosting: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event' 
    }]
})

const User = mongoose.model('User', UserSchema);
module.exports = User;

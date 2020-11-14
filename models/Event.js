const mongoose = require('mongoose');
const Schema = mongoose.Schema

const EventSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    gameSystem: {
        type: String,
        required: true
    },
    gameEdition: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    hostUser: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    nonHostUsers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    maximumNonHostPlayerCount: {
        type:  Number,
        required: true
    },
    currentNonHostPlayerCount: {
        type: Number
    },
    howTheEventHappens: {
        //is this a virtual event? in person meetup? convention?
        type: String,
        required: true
    },
    meetupGatheringInfo: {
        //zoom, discord, in person. links and address would go here
        type: String,
        required: true
    },
    typeOfEventActivity: {
        //boardgame, rpg.... something else???
        type: String,
        required: true,
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventPicture: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    experienceLevel: {
        type: String
    }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
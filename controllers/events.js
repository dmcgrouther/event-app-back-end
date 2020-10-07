const db = require('../models');
const { all } = require('../routes/auth');

const createEvent = (req, res) => {
    db.Event.create(req.body, (err, createdEvent) => {
        if (err) return res.status(500).json({
            status: 500,
            error: [{message: 'Something went wrong. Please try again.'}]
        });
        res.status(201).json({
            status: 201,
            count: 1,
            data: createdEvent,
            dateCreated: new Date().toLocaleString(),
        });
    });
};

const showAllEvents = (req, res) => {
    db.Event.find({}, (err, allEvents) => {
        if (err) return res.status(500),json({
            status: 500,
            error: [{message: 'Could not display all events! Please try again'}],
        });
        res.json({
            status: 200,
            count: allEvents.length,
            data: allEvents,
            requestedAt: new Date().toLocaleString(),
        });
    });
};

module.exports = {
    createEvent,
    showAllEvents,
}
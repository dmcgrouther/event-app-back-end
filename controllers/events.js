const db = require('../models');

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

module.exports = {
    createEvent,
}
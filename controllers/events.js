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

const showOneEvent = (req, res) => {
    db.Event.findById(req.params.eventId, (error, foundEvent) => {
        if(error) return console.log(error);
        if(foundEvent) {
            res.json({
                status: 200,
                count: 1,
                data: foundEvent,
                requestedAt: new Date().toLocaleString(),
            });
        } else {
            res.json({
                status: 404,
                count: 0,
                data: `Event with ID ${req.params.eventId} was not found.`
            })
        }
    })
};

const editOneEvent = (req, res) => {
    db.Event.findByIdAndUpdate(
        req.params.eventId,
        req.body,
        {new: true}, (err, updatedEvent) => {
            if(err) return res.status(500).json({
                status: 500,
                error: [{message: 'Something went wrong with editing!'}],
            });

            res.json({
                status: 200,
                count: 1,
                data: updatedEvent,
                requestedAt: new Date().toLocaleString()
            });
        });
}

const deleteOneEvent = (req, res) => {
    db.Event.findByIdAndDelete(
        req.params.eventId, (err, deleteEvent) => {
            if(err) return res.status(500).json({
                status: 500,
                error: [{message: 'Could not delete event!'}],
            });
            res.json({
                status: 200,
                count: 1,
                data: deleteEvent,
                requestedAt: new Date().toLocaleString(),
            });
        });
}


module.exports = {
    createEvent,
    showAllEvents,
    showOneEvent,
    editOneEvent,
    deleteOneEvent,
}
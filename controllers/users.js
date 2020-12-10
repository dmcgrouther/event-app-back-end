const db = require('../models');

const showAUser = (req, res) => {
    db.User.findById(req.params.userId, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: err
        });
        res.status(200).json({
            status: 200,
            data: foundUser,
        });
    });
};

const editCurrentUser = (req, res) => {
    db.User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {new: true}, (error, updatedUser) => {
            if (error) return res.status(500).json({
                status: 500,
                error: [{message: 'Something went wrong! Please try again'}],
            });

            res.json({
                status: 200,
                count: 1,
                data: updatedUser,
                requestedAt: new Date().toLocaleString()
            })
        })
}

// const deleteCurrentUser = (req, res) => {
//     db.User.findByIdAndDelete(
//       req.params.userId, (err, deleteUser) =>{
//         if (err)  return res.status(500).json({
//           status: 500,
//           error: [{message: 'Something went wrong! Please try again'}],
//         });
//         res.json({
//           status:200,
//           count: 1,
//           data: deleteUser,
//           requestedAt: new Date().toLocaleString(),
//         })
//       })
//   }

const deleteCurrentUser = async (req, res) => {
    let userId = req.params.userId
    // let eventsAttending = []
    try {
        const deleteUser = await db.User.findByIdAndDelete(userId)
        const eventsFound = await db.Event.find()
    
        eventsFound.forEach(eventFound => {
            let editAttendees = eventFound.nonHostUsers.filter( attendeeId => attendeeId != userId )
            eventFound.nonHostUsers = editAttendees
            eventFound.currentNonHostPlayerCount = eventFound.currentNonHostPlayerCount-1
            eventFound.save()
        })
        
        return res.status(200).json({ status: 200, data: deleteUser, delete: eventsAttending })
    } catch {
        return res.status(500).json({ error: "Cloud not find this user"})
    }
}

module.exports = {
    showAUser,
    editCurrentUser,
    deleteCurrentUser
}
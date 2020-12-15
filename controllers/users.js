const db = require('../models');

const showAUser = async (req, res) => {
    let userId = req.params.userId
    let events = []
    let hosts = []

    try {
        const foundUser = await db.User.findById(userId)
        const eventAttended = await db.Event.find({ nonHostUsers: { $all: [userId] } }).populate("user")
        const eventHosted = await db.Event.find({ hostUser: [userId]}).populate("user")
        eventAttended.forEach(event => events.push(event._id))
        eventHosted.forEach(event => hosts.push(event._id))

        foundUser.usersEventsAsAttendee = events
        foundUser.eventsUserIsHosting = hosts

        return res.status(200).json({ status: 200, data: foundUser })
    } catch {
        return res.status(500).json({ error: "Cloud not find this user"})
    }
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

const deleteCurrentUser = (req, res) => {
    db.User.findByIdAndDelete(
      req.params.userId, (err, deleteUser) =>{
        if (err)  return res.status(500).json({
          status: 500,
          error: [{message: 'Something went wrong! Please try again'}],
        });
        res.json({
          status:200,
          count: 1,
          data: deleteUser,
          requestedAt: new Date().toLocaleString(),
        })
      })
  }

// const deleteCurrentUser = async (req, res) => {
//     let userId = req.params.userId
//     // let eventsUserIsAttending = []
//     // let eventsUserIsHostingToDelete = [];

//     try {
//         const deleteUser = await db.User.findByIdAndDelete(userId)
//         const hostsFound = await db.Event.deleteMany({ hostUser: [userId]}).populate('user')
//         //the above should probably be changed to hostedEventsToDelete

//         const eventsFound = await db.Event.find()
    
//         eventsFound.forEach(eventFound => {
//             let editAttendees = eventFound.nonHostUsers.filter( attendeeId => attendeeId != userId )
//             eventFound.nonHostUsers = editAttendees
//             if(eventFound.currentNonHostPlayerCount > 0 ){
//                 eventFound.currentNonHostPlayerCount = eventFound.currentNonHostPlayerCount-1
//             } 
//             eventFound.save()
//         })
        
//         return res.status(200).json({ status: 200, data: deleteUser, delete: hostsFound.deletedCount })
//     } catch {
//         return res.status(500).json({ error: "Cloud not find this user"})
//     }
// }

module.exports = {
    showAUser,
    editCurrentUser,
    deleteCurrentUser
}
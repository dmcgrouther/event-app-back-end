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

// const deleteCurrentUser = (req, res) => {
//     db.User.findById(req.params.userId, (err, foundUser) => {
//         if (err) return res.status(500).json({
//             status: 500,
//             message: err
//         });
//         return ( res.status(200).json({
//             status: 200,
//             data: foundUser,
//         }), 
//         foundUser.eventsUserIsHosting.forEach(eventUserIsHosting => {
//             console.log(eventUserIsHosting)
//             db.Event.findById(eventUserIsHosting, (err, foundEvent) => {
//                 if (err) return res.status(500).json({
//                     status: 500,
//                     message: err
//                 });
//                 return res.status(201).json({
//                     status: 201,
//                     count: 1,
//                     data: foundEvent,
//                     requestedAt: new Date().toLocaleString(),
//                 }) 
//             })
//         }))
//     })
// }

module.exports = {
    showAUser,
    editCurrentUser,
    deleteCurrentUser
}
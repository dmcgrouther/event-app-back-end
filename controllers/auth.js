const bcrypt = require('bcryptjs');
const db = require('../models');

const register = (req, res) => {
    console.log('hi')
    console.log(req.body);
    if(!req.body.userName || !req.body.email || !req.body.password){
        return res.status(400).json({ status: 400, message: 'Please enter your username, email, and password'});
    }
    db.User.findOne({ email: req.body.email, }, (err, foundUser) => {
        if (err) return res.status(500).json({ status: 500, message: 'Something has gone wrong please try again.' });
    
        if(foundUser) return res.status(400).json({ status: 400, message: 'Email address has already been registered please try again'});

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({ status: 500, message: 'Something wernt wrong. Please try again'});

            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return res.status(500).json({ status: 500, message: 'Something went wrong. Please try again.'})

                const newUser = {
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hash,
                }

                db.User.create(newUser, (err, savedUser) => {
                    if (err) return res.status(500).json({ status: 500, message: err })
                    res.status(201);
                })
            })
        })
    })
}

const login = (req, res) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({status: 400, message: 'Please enter your email and password' });
    }
    db.User.findOne({email: req.body.email}, (err, foundUser) => {
        if(err) return res.status(500).json({status: 500});

        if (!foundUser) {
            return res.status(400).json({status: 400, message: 'Email or password is incorrect'});
        }
        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({ status: 500, message: 'Something went wrong please try again'});
        
            if (isMatch) {
                req.session.currentUser = { id: foundUser._id};
                console.log(req.session)
                return res.status(200).json({ status: 200, message: 'Success', data: foundUser._id });
            } else {
                return res.status(400).json({ status: 400, message: 'Email or password is incorrect' })
            }
        })
    })
}

module.exports = {
    register,
    login,
}
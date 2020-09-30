const bcrypt = require('bcryptjs');
const db = require('../models');

const register = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });
        if (foundUser) {
            return res.status(400).json({ status: 400, error: 'Something has gone wrong please try again.'})
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            const createUser = { ...req.body, password: hash }
            const user = await db.User.create(createUser)
            return res.status(200).json({ status: 200, data: user._id, info: req.body})
        }
    } catch {
        return res.status(500).json({ status: 500, error: 'Something has gone wrong, Please try again' })
    }
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
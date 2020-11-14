const bcrypt = require('bcryptjs');
const db = require('../models');

const register = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email })
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

const login = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email })
        const isMatch = await bcrypt.compare(req.body.password, foundUser.password)
        if (isMatch) {
            req.session.currentUser = foundUser.id
            return res.status(200).json({ status: 200, message: 'Success', data: foundUser.id })
        } else {
            return res.status(400).json({ status: 400, message: 'Email or password is incorrect' })
        }
    } catch {
        return res.status(500).json({ status: 500, error: 'Something has gone wrong, Please try again' })
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy()
        return res.status(200).json({ status: 200, message: 'Success Logout' });
    } catch {
        return res.status(400).json({ status: 400, error: 'Something has gone wrong, Please try again' });
    }
}

module.exports = {
    register,
    login,
    logout,
}
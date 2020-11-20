const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('auth/register', ctrl.auth.register);
router.post('auth/login', ctrl.auth.login);
router.delete('auth/logout', ctrl.auth.logout);

module.exports = router;
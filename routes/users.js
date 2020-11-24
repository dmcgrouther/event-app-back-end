const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/:userId', ctrl.users.showAUser);
router.put('/:userId', ctrl.users.editCurrentUser);

module.exports = router;
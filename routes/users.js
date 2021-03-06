const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/:userId', ctrl.users.showAUser);
router.put('/:userId', ctrl.users.editCurrentUser);
router.delete('/:userId', ctrl.users.deleteCurrentUser);

module.exports = router;
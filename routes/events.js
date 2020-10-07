const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/', ctrl.events.createEvent);
router.get('/', ctrl.events.showAllEvents);

module.exports = router;
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/', ctrl.events.createEvent)

module.exports = router;
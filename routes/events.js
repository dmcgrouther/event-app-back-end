const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('events/', ctrl.events.createEvent);
router.get('/', ctrl.events.showAllEvents);
router.get('/:eventId', ctrl.events.showOneEvent);
router.put('/:eventId', ctrl.events.editOneEvent);
router.delete('/:eventId', ctrl.events.deleteOneEvent);

module.exports = router;
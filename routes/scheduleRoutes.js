const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.route('/')
    .get(scheduleController.getAllSchedules)
    .post(scheduleController.createNewSchedule)
    .patch(scheduleController.updateSchedule)
    .delete(scheduleController.deleteSchedule)

module.exports = router;
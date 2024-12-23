const express = require('express');
const {
    addAttendee,
    getAttendees,
    deleteAttendee,
} = require('../controllers/attendeeController');

const router = express.Router();

// Add an attendee to a specific event
router.post('/:eventId', addAttendee); // Use eventId in the URL

// Get all attendees for a specific event
router.get('/:eventId', getAttendees); // Use eventId in the URL

// Delete an attendee from a specific event
router.delete('/:eventId/:id', deleteAttendee); // Use both eventId and attendee id

module.exports = router;
    
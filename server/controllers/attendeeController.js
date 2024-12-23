const Attendee = require('../models/Attendee');
const mongoose = require('mongoose');
const Event = require('../models/Event');

// Add an Attendee for a specific Event
exports.addAttendee = async (req, res) => {
    try {
        const { name, email } = req.body; // We expect name and email in the body
        const { eventId } = req.params; // Get eventId from URL parameter

        // Validate if eventId exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Check if attendee with the same email already exists for the event
        const existingAttendee = await Attendee.findOne({ eventId, email });
        if (existingAttendee) {
            return res.status(400).json({ success: false, message: 'Attendee already exists for this event' });
        }

        // Create a new attendee linked to the event
        const attendee = await Attendee.create({ eventId, name, email });
        res.status(201).json({ success: true, data: attendee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Attendees for a specific Event
exports.getAttendees = async (req, res) => {
    try {
        const eventId = req.params.eventId; // Get eventId from URL

        // Validate if eventId exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Get all attendees for the specific event
        const attendees = await Attendee.find({ eventId }).populate('tasks');
        res.status(200).json({ success: true, data: attendees });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete an Attendee for a specific Event
exports.deleteAttendee = async (req, res) => {
    try {
        const { eventId, id } = req.params; // Get eventId and attendee id from URL

        // Validate if eventId exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Find and delete the attendee for the specific event
        const attendee = await Attendee.findOneAndDelete({ _id: id, eventId });
        if (!attendee) {
            return res.status(404).json({ success: false, message: 'Attendee not found for this event' });
        }

        res.status(200).json({ success: true, message: 'Attendee deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

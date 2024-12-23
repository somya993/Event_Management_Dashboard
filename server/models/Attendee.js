const mongoose = require('mongoose');

const attendeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,  // Ensure 'name' is provided
    },
    email: {
        type: String,
        required: true, // Ensure 'email' is provided
        unique: true,  // Prevent duplicate emails
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // Validate email format
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', // Ensure this references the Event model
        required: true, // Ensure that every attendee is linked to an event
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
}, { timestamps: true });  // Include timestamps to track creation and updates

module.exports = mongoose.model('Attendee', attendeeSchema);

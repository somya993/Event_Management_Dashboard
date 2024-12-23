const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: String,
    description: String,
    location: String,
    date: Date,
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' }],
});

module.exports = mongoose.model('Event', eventSchema);

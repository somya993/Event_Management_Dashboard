const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    deadline: Date,
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'] },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the User model
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },    // Reference to the Event model
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

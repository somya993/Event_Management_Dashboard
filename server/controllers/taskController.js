const Task = require('../models/Task');
const Event = require('../models/Event'); // Ensure this is the correct path

exports.createTask = async (req, res) => {
    try {
      const { eventId, assignedTo, name, description, deadline } = req.body;
  
      // Ensure that all required fields are provided
      if (!eventId || !assignedTo || !name || !description || !deadline) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Create a new task
      const newTask = new Task({
        eventId,
        assignedTo,
        name,
        description,
        deadline,
      });
  
      // Save the task to the database
      await newTask.save();
  
      // Send the created task as a response
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating task' });
    }
};
  
 




// Get Tasks for an Event
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ eventId: req.params.eventId })
            .populate('assignedTo', 'name') // Populate only the 'name' field from the User model
            .populate('eventId');   // Populate event details (optional)

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ success: false, message: 'No tasks found for this event' });
        }

        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




exports.updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findById(req.params.id)
            .populate('assignedTo', 'name')
            .populate('eventId');


        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

        console.log('Assigned To Before Update:', task.assignedTo); // Log assignedTo before update

        task.status = status;
        await task.save();

        // Re-populate the assignedTo field after the update
        await task.populate('assignedTo', 'name').populate('eventId').execPopulate();

        console.log('Assigned To After Update:', task.assignedTo);  // Log assignedTo after update

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




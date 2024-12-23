const express = require('express');
const {
  createTask,
  getTasks,
  updateTaskStatus,
} = require('../controllers/taskController');

const router = express.Router();

// POST request to create a task
router.post('/', createTask);

// GET request to get tasks for an event
router.get('/:eventId', getTasks);

// PUT request to update task status
router.put('/:id', updateTaskStatus);

module.exports = router;

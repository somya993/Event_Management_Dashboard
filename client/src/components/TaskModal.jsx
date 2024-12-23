import React, { useState } from "react";
import PropTypes from "prop-types"; // Added for prop validation
import axios from "axios";

const TaskModal = ({ closeModal, updateTasks, selectedEvent, selectedAttendee }) => {
  // States for task details
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  // Handle form submission to create the task
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName || !taskDescription || !deadline) {
      alert("Please fill in all fields.");
      return;
    }

    // Parse the date input into a Date object (yyyy-mm-dd format)
    const currentDate = new Date(); // Current date and time
    const selectedDeadline = new Date(deadline); // Deadline selected by the user
    const eventDate = new Date(selectedEvent); // Event date passed from parent

    console.log("Current Date:", currentDate);
    console.log("Selected Deadline:", selectedDeadline);
    console.log("Event Date:", eventDate);

    // Validation: Check if the deadline is in the future
    if (selectedDeadline <= currentDate) {
      alert("Please select a future date for the deadline.");
      return;
    }

    // Validation: Check if the deadline is before the event date
    if (selectedDeadline >= eventDate) {
      alert("The deadline must be before the event date.");
      return;
    }

    try {
      const taskData = {
        eventId: selectedEvent, // Use selectedEvent passed from parent
        assignedTo: selectedAttendee._id, // Use selectedAttendee._id from parent
        name: taskName,
        description: taskDescription,
        deadline, // Sending the deadline as is (yyyy-mm-dd format)
      };

      console.log("Sending task data:", taskData);
      const response = await axios.post("http://localhost:4000/api/tasks", taskData); // Corrected URL to match backend port
      console.log("Task assigned:", response.data);

      updateTasks((prevTasks) => [...prevTasks, response.data]);
      closeModal();
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("There was an error assigning the task.");
    }
  };

  return (
    <>
      {/* Overlay Background */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeModal}></div>

      {/* Modal */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full relative">
          {/* Close Button */}
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-2 top-2 text-xl font-semibold text-gray-500"
          >
            ✕
          </button>

          <h3 className="font-bold text-xl mb-4">Assign Task</h3>

          {/* Task Name Input */}
          <div className="py-4">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task Name"
              className="p-2 border border-gray-300 rounded-lg w-full"
              required
            />
          </div>

          {/* Task Description Input */}
          <div className="py-4">
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Task Description"
              className="p-2 border border-gray-300 rounded-lg w-full"
              required
            />
          </div>

          {/* Task Deadline Input */}
          <div className="py-4">
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Assign
          </button>
        </div>
      </div>
    </>
  );
};

// Prop Types for Validation
TaskModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  updateTasks: PropTypes.func.isRequired,
  selectedEvent: PropTypes.string.isRequired,
  selectedAttendee: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskModal from '../components/TaskModal'; // Import the TaskModal component for task creation

const TaskPage = () => {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [editingTask, setEditingTask] = useState(null); // Track the task being edited

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/events/');
                setEvents(response.data.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    // Fetch tasks for a specific event
    const fetchTasks = async (eventId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/tasks/${eventId}`);
            setTasks(response.data.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Function to update the tasks list after a task is created or updated
    const updateTasks = (newTask) => {
        setTasks((prevTasks) => {
            const taskIndex = prevTasks.findIndex((task) => task._id === newTask._id);
            if (taskIndex >= 0) {
                const updatedTasks = [...prevTasks];
                updatedTasks[taskIndex] = newTask;
                return updatedTasks;
            }
            return [...prevTasks, newTask]; // If task doesn't exist, add it
        });
    };

    // Event card JSX
    const EventCard = ({ event }) => (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">{event.name}</h3>
            <p className="text-gray-600">{event.description}</p>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                    setSelectedEventId(event._id);
                    fetchTasks(event._id);
                }}
            >
                View Tasks
            </button>
        </div>
    );

    // Task details in a table
    const TaskTable = () => (
        <div className="mt-6 overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left">Task Name</th>
                        <th className="px-4 py-2 text-left">Assigned To</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id} className="border-t">
                            <td className="px-4 py-2">{task.name}</td>
                            <td className="px-4 py-2">{task.assignedTo?.name || 'Not Assigned'}</td>
                            <td className="px-4 py-2">{task.status}</td>
                            <td className="px-4 py-2">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                    onClick={() => {
                                        setEditingTask(task); // Set task for editing
                                        setIsModalOpen(true); // Open modal for editing
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6">Task Management</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>

            {/* Show tasks if an event is selected */}
            {selectedEventId && tasks.length > 0 && (
                <div>
                    <h3 className="text-2xl font-semibold mt-8">Tasks for Event</h3>
                    <TaskTable />
                </div>
            )}

            {/* Show a message if no tasks are available */}
            {selectedEventId && tasks.length === 0 && (
                <p className="mt-4 text-gray-500">No tasks available for this event.</p>
            )}

            {/* Task Modal */}
            {isModalOpen && (
                <TaskModal
                    closeModal={() => setIsModalOpen(false)}
                    eventId={selectedEventId}
                    task={editingTask}
                    updateTasks={updateTasks} // Pass updateTasks to modal
                />
            )}
        </div>
    );
};

export default TaskPage;

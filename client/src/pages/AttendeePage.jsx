import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskModal from "../components/TaskModal"; // Import TaskModal component

const AttendeesPage = () => {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddAttendeeForm, setShowAddAttendeeForm] = useState(false);
  const [newAttendee, setNewAttendee] = useState({ name: "", email: "" });
  const [showTaskModal, setShowTaskModal] = useState(false); // State for Task Modal
  const [selectedAttendee, setSelectedAttendee] = useState(null); // Selected attendee for task assignment

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/events/");
        setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Fetch attendees for a specific event
  const fetchAttendees = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/attendees/${eventId}`);
      setAttendees(response.data.data);
      setSelectedEvent(eventId);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  // Handle opening the Task Modal
  const openTaskModal = (attendee) => {
    setSelectedAttendee(attendee);
    setShowTaskModal(true);
  };
  
  // Handle closing the Task Modal
  const closeTaskModal = () => {
    setShowTaskModal(false);
    setSelectedAttendee(null); // Reset selected attendee
  };

  // Delete an attendee
  const deleteAttendee = async (eventId, attendeeId) => {
    try {
      await axios.delete(`http://localhost:4000/api/attendees/${eventId}/${attendeeId}`);
      setAttendees(attendees.filter((attendee) => attendee._id !== attendeeId));
    } catch (error) {
      console.error("Error deleting attendee:", error);
    }
  };

  // Add an attendee
  const addAttendee = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/attendees/${selectedEvent}`,
        {
          name: newAttendee.name,
          email: newAttendee.email,
        }
      );
      
      setAttendees((prevAttendees) => [...prevAttendees, response.data.data]);
      setNewAttendee({ name: "", email: "" });
      setShowAddAttendeeForm(false);
    } catch (error) {
      console.error("Error adding attendee:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Attendee Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold">{event.name}</h3>
            <p className="text-gray-600">{event.date}</p>
            <button
              onClick={() => fetchAttendees(event._id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              View Attendees
            </button>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Attendees for Event</h2>
          <button
            onClick={() => setShowAddAttendeeForm(!showAddAttendeeForm)}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Add Attendee
          </button>

          {showAddAttendeeForm && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={newAttendee.name}
                onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
                className="p-2 border border-gray-300 rounded-lg mr-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={newAttendee.email}
                onChange={(e) => setNewAttendee({ ...newAttendee, email: e.target.value })}
                className="p-2 border border-gray-300 rounded-lg mr-2"
              />
              <button
                onClick={addAttendee}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          )}

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left border-b">Name</th>
                <th className="py-2 px-4 text-left border-b">Email</th>
                <th className="py-2 px-4 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee) => (
                <tr key={attendee._id}>
                  <td className="py-2 px-4 border-b">{attendee.name}</td>
                  <td className="py-2 px-4 border-b">{attendee.email}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => openTaskModal(attendee)} // Open task modal
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                    >
                      Assign Task
                    </button>
                    <button
                      onClick={() => deleteAttendee(selectedEvent, attendee._id)}
                      className="px-4 ml-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Render TaskModal component when showTaskModal is true */}
      {showTaskModal && (
        <TaskModal 
        closeModal={closeTaskModal} 
        selectedEvent={selectedEvent} 
        selectedAttendee={selectedAttendee} 
      />
      )}
    </div>
  );
};

export default AttendeesPage;

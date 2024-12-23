
import React, { useState } from 'react';
import { getAttendees, deleteAttendee } from './api'; // Assume these API functions are defined

const AttendeeList = ({ event }) => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleViewAttendees = async () => {
    setLoading(true);
    try {
      const response = await getAttendees(event._id);
      setAttendees(response.data);
    } catch (error) {
      console.error("Failed to fetch attendees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAttendee = async (attendeeId) => {
    try {
      await deleteAttendee(event._id, attendeeId);
      setAttendees(attendees.filter((attendee) => attendee._id !== attendeeId));
    } catch (error) {
      console.error("Failed to remove attendee:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold">{event.name}</h3>
      <p>{event.location}</p>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <button
        onClick={handleViewAttendees}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        View Attendees
      </button>

      {loading && <p>Loading attendees...</p>}

      {attendees.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold">Attendees:</h4>
          <table className="min-w-full mt-2 table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Tasks</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee) => (
                <tr key={attendee._id}>
                  <td className="border px-4 py-2">{attendee.name}</td>
                  <td className="border px-4 py-2">{attendee.email}</td>
                  <td className="border px-4 py-2">
                    {attendee.tasks.map((task) => (
                      <div key={task._id}>
                        <p>{task.name}</p>
                      </div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleRemoveAttendee(attendee._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded"
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
    </div>
  );
};

export default AttendeeList;

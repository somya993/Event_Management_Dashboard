import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import EventCard from '../components/EventCard'; // Import the EventCard component

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newEvent, setNewEvent] = useState({ name: '', description: '', location: '', date: '' });
    const [editEvent, setEditEvent] = useState(null);

    // Fetch events from API
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/events/');
            const data = await response.json();
            if (data.success) {
                setEvents(data.data);
            } else {
                console.error('Failed to fetch events:', data.message);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleDelete = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/events/${eventId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setEvents(events.filter(event => event._id !== eventId));
            } else {
                console.error('Failed to delete event:', data.message);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleEdit = (event) => {
        setEditEvent(event);
        setNewEvent({
            name: event.name,
            description: event.description,
            location: event.location,
            date: event.date,
        });
        setShowForm(true); // Show the form for editing
    };

    const handleAddEvent = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/events/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });
            const data = await response.json();
            if (data.success) {
                setEvents([...events, data.data]);
                setShowForm(false);
                setNewEvent({ name: '', description: '', location: '', date: '' });
            } else {
                console.error('Failed to add event:', data.message);
            }
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleUpdateEvent = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/events/${editEvent._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });
            const data = await response.json();
            if (data.success) {
                setEvents(events.map(event => event._id === editEvent._id ? data.data : event));
                setShowForm(false);
                setNewEvent({ name: '', description: '', location: '', date: '' });
                setEditEvent(null);
            } else {
                console.error('Failed to update event:', data.message);
            }
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    return (
        <Container>
            <div className="container mx-auto p-6 ml-20">
                <h1 className="text-3xl font-semibold mb-6">Event Management</h1>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    variant="success"
                    className="bg-pink-500 text-white rounded-md px-4 py-2 mb-4"
                >
                    {showForm ? 'Cancel' : 'Add Event'}
                </Button>

                {showForm && (
                    <div className="p-4 border rounded-lg bg-gray-100">
                        <Form>
                            <Form.Group controlId="eventName">
                                <Form.Label>Event Name: </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event name"
                                    name="name"
                                    value={newEvent.name}
                                    className='border border-gray-300 rounded-md p-2'
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            
                            <Form.Group controlId="eventLocation" className="mt-3">
                                <Form.Label>Location: </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event location"
                                    name="location"
                                    value={newEvent.location}
                                    className='border border-gray-300 rounded-md p-2'
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="eventDate" className="mt-3">
                                <Form.Label>Date: </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={newEvent.date}
                                    className='border border-gray-300 rounded-md p-2'
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                className="mt-4 bg-pink-500 text-white rounded-md p-2"
                                onClick={editEvent ? handleUpdateEvent : handleAddEvent}
                            >
                                {editEvent ? 'Update Event' : 'Add Event'}
                            </Button>
                        </Form>
                    </div>
                )}
            </div>

            {/* Events list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                    <EventCard
                        key={event._id}
                        event={event}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </Container>
    );
};

export default EventPage;

import React from 'react';
import { Button } from 'react-bootstrap';

const EventCard = ({ event, onEdit, onDelete }) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl mb-4 ml-20 ">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Event"
                    className="w-full h-64 object-cover"
                />
            </figure>
            <div className="card-body p-5">
                <h2 className="card-title">{event.name}</h2>
                <p>{event.description}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>

                <div className="card-actions justify-end">
                    <Button variant="primary" className='mt-4 bg-green-500 text-white rounded-md p-3' onClick={() => onEdit(event)}>
                        Edit
                    </Button>
                    <Button variant="danger" className='mt-4 bg-red-500 text-white rounded-md p-3 ml-2' onClick={() => onDelete(event._id)} >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;

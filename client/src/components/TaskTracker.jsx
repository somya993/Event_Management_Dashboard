import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

const TaskTracker = ({ task, onUpdateStatus }) => {
    const [status, setStatus] = useState(task.status);

    const handleStatusChange = () => {
        const newStatus = status === 'Pending' ? 'Completed' : 'Pending';
        setStatus(newStatus);
        onUpdateStatus(task._id, newStatus);
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{task.name}</Card.Title>
                <Card.Text>
                    <strong>Status:</strong> {status}
                </Card.Text>
                <Button variant="primary" onClick={handleStatusChange}>Toggle Status</Button>
            </Card.Body>
        </Card>
    );
};

export default TaskTracker;

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#">Dashboard</Navbar.Brand>
            <Nav className="mr-auto">
                <Link to="/events" className="nav-link">Events</Link>
                <Link to="/attendees" className="nav-link">Attendees</Link>
                <Link to="/tasks" className="nav-link">Tasks</Link>
            </Nav>
        </Navbar>
    );
};

export default NavigationBar;

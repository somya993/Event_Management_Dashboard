import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';  // Import the HomePage component
import EventPage from './pages/EventPage';
import TaskPage from './pages/TaskPage';
import AttendeePage from './pages/AttendeePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/attendees" element={<AttendeePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

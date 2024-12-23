import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';

const HomePage = () => {
    return (
        <div>
            <Banner />


            {/* Cards Section: Event, Task, Attendees */}
            <div className="flex justify-center gap-6 mt-10 mb-10">
                {/* Event Card */}
                <div className="card bg-base-100 w-[400px] h-[500px] shadow-xl rounded-lg hover:scale-105 transition-transform duration-300">
                    <figure>
                        <img src="/events.jpg" alt="Event" className="w-full h-80 object-cover rounded-t-lg" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold pl-5 pt-5 font text-2xl">Events</h2>
                        <p className='pl-5 pt-3'>Manage and view your events here.</p>
                        <div className="card-actions pt-6 flex justify-center">
                        <Link to="/events">
                                <button className="btn btn-primary p-3 bg-pink-500 text-white rounded-md hover:bg-pink-700">View Event</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Task Card */}
                <div className="card bg-base-100 w-[400px] h-[500px] shadow-xl rounded-lg hover:scale-105 transition-transform duration-300">
                    <figure>
                        <img src="/tasks.jpg" alt="Task" className="w-full h-80 object-cover rounded-t-lg" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold pl-5 pt-5 font text-2xl">Tasks</h2>
                        <p className='pl-5 pt-3'>Track and manage your tasks here.</p>
                        <div className="card-actions pt-6 flex justify-center">
                        <Link to="/tasks">
                                <button className="btn btn-primary p-3 bg-pink-500 text-white rounded-md hover:bg-pink-700">View Tasks</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Attendee Card */}
                <div className="card bg-base-100 w-[400px] h-[500px] shadow-xl rounded-lg hover:scale-105 transition-transform duration-300">
                    <figure>
                        <img src="/attendees.jpg" alt="Attendees" className="w-auto h-80 object-cover rounded-t-lg" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-bold pl-5 pt-5 font text-2xl">Attendees</h2>
                        <p className='pl-5 pt-3'>View and manage your attendees here.</p>
                        <div className="card-actions pt-6 flex justify-center">
                        <Link to="/attendees">
                                <button className="btn btn-primary p-3 bg-pink-500 text-white rounded-md hover:bg-pink-700">View Attendees</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default HomePage;

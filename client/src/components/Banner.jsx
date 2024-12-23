import React from "react";

const Banner = () => {
  return (
    <div className="flex items-center justify-between h-screen bg-white px-8">
      {/* Left Text Section */}
      <div className="w-1/2">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">
          Welcome to Event Management Dashboard{" "}
          <span className="text-pink-500">new everyday!!!</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
        "Streamline your event planning with ease! Manage schedules, track attendees, and oversee all aspects of your events seamlessly in one place."
        </p>
        
      </div>

      {/* Right Image Section */}
      <div className="w-1/2 flex justify-end">
        <img
          src="/bg.jpg" // Replace with your image URL
          alt="Books"
          className="w-[80%] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;

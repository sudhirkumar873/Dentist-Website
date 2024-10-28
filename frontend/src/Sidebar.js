// Sidebar.js
import React from 'react';

const Sidebar = ({ selectedStatus, handleStatusChange }) => {
  return (
    <div className="w-64 bg-gray-200 p-4 border border-black">
      <h2 className="text-lg font-bold mb-4">Appointment Status</h2>
      <div className="flex flex-col justify-evenly">
        {["ALL", "REQUESTS", "VERIFIED", "WAITING", "SCHEDULED", "COMPLETED"].map((status, index) => (
          <button
            key={index}
            onClick={() => handleStatusChange(status)}
            className={`px-4 py-2 rounded-full ${selectedStatus === status ? "bg-red-500 text-white" : "bg-gray-300 text-gray-800"}`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

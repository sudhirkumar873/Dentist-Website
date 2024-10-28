import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Adjust the import path based on your project structure

function AppointmentForm({ onClose }) {
    const [appointments, setAppointments] = useState([]); // State to hold appointments
    const [lastId, setLastId] = useState(1); // State to track the last ID
    const [toggle ,setToggle]=useState(true)
    const [formData, setFormData] = useState({
        finalizeAppointment: false,
        preCheckList: false,
        postCheckList: false,
        location: '45, Street Road Clinic',
        doctor: 'Dr. Niayam',
        date: '',
        time: 'HH-MM',
        patientName: 'Niya Shukla',
        patientPhone: '+325 8658 896',
        visit: 'Root Canal',
        timePreference: '12:00-15:30',
        insuranceProvider: 'Private',
        doctorPreference: 'Male',
        languagePreference: 'German',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const toggleForm = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newId = String(lastId).padStart(3, '0');
            const appointmentToSubmit = { ...formData, id: newId };
            const response = await axios.post('http://localhost:5000/api/appointment/createAppointment', formData);
            if (response.status === 200) {
                setAppointments((prev) => [...prev, response.data]);
                setLastId((prev) => prev + 1);
                onClose(response.data); 
                setIsModalOpen(false); 
                setToggle(!toggle);
                
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    return (
        <div>
            <button
                onClick={toggleForm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
                Schedule Appointment
            </button>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-md font-bold mb-2">Appointment Tasks</h2>
                    <hr />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="location" className="text-gray-700 font-bold text-sm">Denta Base (Office)</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-1 border border-gray-300 rounded-md text-gray-700 font-medium"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="doctor" className="text-gray-700 font-bold text-sm">Doctor:</label>
                            <input
                                type="text"
                                id="doctor"
                                name="doctor"
                                value={formData.doctor}
                                onChange={handleChange}
                                className="w-full p-1 border border-gray-300 rounded-md text-gray-700 font-medium"
                            />
                        </div>
                        {/* Date and Time Inputs Side by Side */}
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="date" className="text-gray-700 font-bold text-sm">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full p-1 border border-gray-300 rounded-md text-gray-700 font-medium"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="time" className="text-gray-700 font-bold text-sm">Time:</label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="w-full p-1 border border-gray-300 rounded-md text-gray-700 font-medium"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="patientName" className="text-gray-700 font-bold text-sm">Patient Name:</label>
                            <input
                                type="text"
                                id="patientName"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleChange}
                                className="w-full p-1 border border-gray-300 rounded-md text-gray-700 font-medium"
                            />
                        </div>
                        {/* Grouping Visit Type, Time Preference, and Insurance Provider */}
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="visitType" className="text-gray-700 font-bold text-sm">Visit Type:</label>
                                <select
                                    id="visitType"
                                    name="visit"
                                    value={formData.visit}
                                    onChange={handleChange}
                                    className="w-full p-1 rounded-md text-gray-700 font-medium"
                                >
                                    <option value="Root Canal">Root Canal</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="timePreference" className="text-gray-700 font-bold text-sm">Time Preference:</label>
                                <select
                                    id="timePreference"
                                    name="timePreference"
                                    value={formData.timePreference}
                                    onChange={handleChange}
                                    className="w-full p-1 rounded-md text-gray-700 font-medium"
                                >
                                    <option value="12:00-15:30">12:00-15:30</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="insuranceProvider" className="text-gray-700 font-bold text-sm">Insurance Provider:</label>
                                <select
                                    id="insuranceProvider"
                                    name="insuranceProvider"
                                    value={formData.insuranceProvider}
                                    onChange={handleChange}
                                    className="w-full p-1 rounded-md text-gray-700 font-medium"
                                >
                                    <option value="Private">Private</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="patientPhone" className="text-gray-700 font-bold text-sm">Patient Phone:</label>
                                <input
                                    type="tel"
                                    id="patientPhone"
                                    name="patientPhone"
                                    value={formData.patientPhone}
                                    onChange={handleChange}
                                    className="w-full p-1 rounded-md text-gray-700 font-medium"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="doctorPreference" className="text-gray-700 font-bold text-sm">Doctor Preference:</label>
                                <select
                                    id="doctorPreference"
                                    name="doctorPreference"
                                    value={formData.doctorPreference}
                                    onChange={handleChange}
                                    className="w-full p-1 rounded-md text-gray-700 font-medium"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="languagePreference" className="text-gray-700 font-bold text-sm">Language Preference:</label>
                                <select
                                    id="languagePreference"
                                    name="languagePreference"
                                    value={formData.languagePreference}
                                    onChange={handleChange}
                                    className="w-full p-1 rounded-md text-gray-700 font-medium"
                                >
                                    <option value="German">German</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Submit</button>
                    </form>
                </Modal>
            )}
        </div>
    );
}

export default AppointmentForm;

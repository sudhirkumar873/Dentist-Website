import React, { useEffect, useState } from 'react';
import AppointmentForm from './AppointmentTask';
import AppointmentModal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faSquare } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const AdminEventList = () => {
    const [allAppointments, setAllAppointments] = useState([]);
    const [toggle, setToggle]=useState(true)
    const [appointments, setAppointments] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('REQUESTS');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/appointment/getAllAppointments');
                setAllAppointments(response.data);
                setAppointments(response.data);
                
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        fetchAppointments();
    }, []);

    const toggleForm = (newAppointment = null) => {
        if (newAppointment) {
            setAppointments((prev) => [...prev, newAppointment]);
        }
        setFormVisible((prev) => !prev);
    };

    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
    };

    const closeModal = () => {
        setSelectedAppointment(null);
    };

    const handleNewAppointment = (newAppointment) => {
        setAppointments((prev) => [...prev, newAppointment]);
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        setAppointments(allAppointments.filter(app => app.status === status)); 
    };

    return (
        <div className="flex min-h-screen flex-col bg-white text-black">
            {/* Top Navigation */}
            <nav className="bg-white text-black p-4 shadow">
                <button className="text-lg font-bold bg-gray-400 text-white rounded-xl p-2">Logo</button>
                <ul className="flex justify-evenly">
                    {['Dashboard', 'Events', 'Calendar', 'Dentists', 'Messages', 'Reports'].map((item, index) => (
                        <button key={index} className="font-medium">
                            <FontAwesomeIcon icon={faSquare} className="mr-2" />
                            {item}
                        </button>
                    ))}
                </ul>
            </nav>

            {/* Main Content */}
            <main className="flex-1 p-2 bg-gray-100 flex">
                {/* Sidebar */}
                <aside className="w-[200px] p-1 shadow-md rounded-lg mr-2 font-semibold">
                    {['REQUESTS', 'VERIFIED', 'WAITING', 'SCHEDULED', 'COMPLETED'].map((status, index) => (
                        <button
                            key={index}
                            onClick={() => handleStatusChange(status)}
                            className={`w-full h-[95px] text-center px-1 py-1 mb-2 rounded-md ${selectedStatus === status ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"}`}
                        >
                            <FontAwesomeIcon icon={faSquare} className="mr-2" />
                            {status}
                        </button>
                    ))}
                </aside>

                {/* Content Area */}
                <div className="flex-1">
                    <header className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-semibold">Patient Appointment Stages</h1>
                            <input
                                type="text"
                                placeholder="Search anything..."
                                className="p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <button onClick={toggleForm} className="px-4 py-2 bg-green-500 text-white rounded-md">
                            New Appointment
                        </button>
                    </header>

                    {/* Show Appointment Form when isFormVisible is true */}
                    {isFormVisible && (
                        <AppointmentForm onClose={() => setFormVisible(false)} onSubmit={handleNewAppointment} />
                    )}

                    {/* Data Table */}
                    <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="p-2 border-b">ID</th>
                                    <th className="p-2 border-b">Name</th>
                                    <th className="p-2 border-b">Dentist</th>
                                    <th className="p-2 border-b">Contact Info</th>
                                    <th className="p-2 border-b">Pre-Time</th>
                                    <th className="p-2 border-b">Pre-Date</th>
                                    <th className="p-2 border-b">Clinic</th>
                                    <th className="p-2 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment) => {
                                    const date = new Date(appointment.date);
                                    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;

                                    return (
                                        <tr key={appointment._id || appointment.id} className="hover:bg-gray-100">
                                            <td className="p-2 border-b">{appointment._id || appointment.id}</td>
                                            <td className="p-2 border-b">{appointment.patientName}</td>
                                            <td className="p-2 border-b">{appointment.doctor}</td>
                                            <td className="p-2 border-b">{appointment.patientPhone}</td>
                                            <td className="p-2 border-b">{appointment.time}</td>
                                            <td className="p-2 border-b">{formattedDate}</td>
                                            <td className="p-2 border-b">{appointment.location}</td>
                                            <td className="p-2 border-b text-center">
                                                <button onClick={() => openModal(appointment)}>
                                                    <FontAwesomeIcon className="bg-gray-100 p-2 rounded-lg" icon={faMessage} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Appointment Modal */}
            {selectedAppointment && (
                <AppointmentModal
                    appointment={selectedAppointment}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default AdminEventList;

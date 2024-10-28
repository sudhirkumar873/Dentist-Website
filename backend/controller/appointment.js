// controllers/appointmentsController.js
import Appointment from '../models/appointment.js';

// Create a new appointment
export const createAppointment = async (req, res) => {
    try {
        const {
            location,
            doctor,
            date,
            time,
            patientName,
            patientPhone,
            visit, // This corresponds to 'visit' in the model
            timePreference,
            insuranceProvider,
            doctorPreference,
            languagePreference,
        } = req.body;

        const appointment = new Appointment({
            location,
            doctor,
            date: new Date(date), // Ensure date is a Date object
            time,
            patientName,
            patientPhone,
            visit, // Map visitType to visit
            timePreference,
            insuranceProvider,
            doctorPreference,
            languagePreference,
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all appointments
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific appointment by ID
export const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an appointment by ID
export const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an appointment by ID
export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json({ message: 'Appointment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

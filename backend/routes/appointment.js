// routes/appointments.js
import express from 'express';
import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} from '../controller/appointment.js';

const router = express.Router();

// Route to create a new appointment
router.post('/createAppointment', createAppointment);

// Route to get all appointments
router.get('/getAllAppointments', getAllAppointments);

// Route to get a specific appointment by ID
router.get('/getAppointmentById/:id', getAppointmentById);

// Route to update an appointment by ID
router.put('/updateAppointment/:id', updateAppointment);

// Route to delete an appointment by ID
router.delete('/deleteAppointment/:id', deleteAppointment);

export default router;

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  location: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  patientName: { type: String, required: true },
  patientPhone: { type: String, required: true },
  visit: { type: String, required: true },
  timePreference: { type: String, required: true },
  insuranceProvider: { type: String, required: true },
  doctorPreference: { type: String, required: true },
  languagePreference: { type: String, required: true }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;

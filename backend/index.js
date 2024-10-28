import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import appointmentsRouter from "./routes/appointment.js";
import cors from 'cors'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());

// Route setup with logging
app.use('/api/appointment', appointmentsRouter);
console.log("Route/api/appointments is set up.");

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.error("Connection error", error);
    });

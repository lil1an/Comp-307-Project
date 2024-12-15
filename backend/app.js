// Import environment variables
import dotenv from 'dotenv'
dotenv.config()

// Import modules
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http';
import { initializeSocket } from './socket.js';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import meetingRoutes from './routes/meetingRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

// Import models
import User from './models/User.js'

// Connect to the database
await connectDB();

// Initialize express app
const app = express();

// Initialize Server
const server = http.createServer(app);

// Socket.io functionalities
initializeSocket(server);

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: true, credentials: true }))

// Routes
app.use('/users', userRoutes);
app.use('/meetings', meetingRoutes);
app.use('/requests', requestRoutes);
app.use('/notifications', notificationRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



export default app;

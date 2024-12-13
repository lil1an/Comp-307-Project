import path from 'path' // Import path for serving static files
import dotenv from 'dotenv'
dotenv.config()

// Import modules
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import { initializeSocket } from './socket.js'
import connectDB from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import meetingRoutes from './routes/meetingRoutes.js'
import requestRoutes from './routes/requestRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'

// Import models
import User from './models/User.js'
import { hostname } from 'os'

// Connect to the database
await connectDB()

// Initialize express app
const app = express()

// Initialize Server
const server = http.createServer(app)

// Socket.io functionalities
initializeSocket(server)

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: true, credentials: true }))

// Routes
app.use('/api/users', userRoutes)
app.use('/api/meetings', meetingRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/notifications', notificationRoutes)

// Serve Frontend Static Build Files
const __dirname = path.resolve() // Set __dirname for ES module compatibility

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  }
})

// Start the server
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST
server.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app

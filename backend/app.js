// import modules
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

// Import Models
import User from './models/User.js'

// app
const app = express()

// db
console.log(process.env.MONGO_URI)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB CONNECTION ERROR', err))

// Test
const user = new User({
  firstName: 'Lian',
  lastName: 'Lambert',
  email: 'lian.lambert@gmail.com',
  password: 'pwd',
})

await user.save()

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: true, credentials: true }))

// routes
import testRoutes from './routes/test.js'
app.use('/', testRoutes)

// port
const port = process.env.PORT || 8080

// listener
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
)

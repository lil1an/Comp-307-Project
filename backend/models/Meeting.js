import mongoose from 'mongoose'
const { Schema, model } = mongoose

const meeting = new Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  availabilities: { type: Map, of: Array, required: true }, // Will store {key : [start: time, end: time]}
  linkOrLocation: { type: String, required: false },
  attachment: { type: String, required: false },
  bookings: [
    {
      attendee: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      date: { type: String, required: true }, // Store as ISO date string (e.g., '2024-12-15')
      starttime: { type: String, required: true }, // Store as ISO time string (e.g., '14:00')
      endtime: { type: String, required: true }, // Store as ISO time string (e.g., '14:30')
    },
  ],
  duration: { type: Number, required: true },
  dateRange: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
})

const Meeting = model('meetings', meeting)

export default Meeting

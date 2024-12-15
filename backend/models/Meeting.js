import mongoose from 'mongoose'
const { Schema, model } = mongoose

const meeting = new Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  availabilities: { type: Map, of: Array, required: true }, // Will store {key : [start: time, end: time]}
  linkOrLocation: { type: String, required: false },
  attachment: { type: String, required: false },
  bookings: { type: Array, required: true }, // bookings is an array of [user, timeBooked]
  duration: {type: Number, required: true},
})

const Meeting = model('meetings', meeting)

export default Meeting

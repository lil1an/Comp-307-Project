import mongoose from 'mongoose'
const { Schema, model } = mongoose

const meeting = new Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  availabilities: { type: Array, required: true }, // availabilities is an array of [date, times available]
  linkOrLocation: { type: String, required: false },
  attachment: { type: String, required: false },
  bookings:  { type: Array, required: true }, // bookings is an array of [user, timeBooked]
})

const Meeting = model('meetings', meeting)

export default Meeting

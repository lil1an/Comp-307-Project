import mongoose from 'mongoose'
const { Schema, model } = mongoose

const meeting = new Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  availabilities: { type: Array, required: true },
  link: { type: String, required: false },
  location: { type: String, required: false },
  attachment: { type: String, required: false },
  allowMultipleAttendees: { type: Boolean, required: true },
  attendees:  { type: Array, required: true },
})

const Meeting = model('meetings', meeting)

export default Meeting

import mongoose from 'mongoose'
const { Schema, model } = mongoose

// If it's a meeting being updated, hostUpdatedMeeting MUST be provided
// so that we know whether to notify the host or attendees

// To Do: when Lilan creates meetings, change time type: String to the proper type

const notification = new Schema({
  time: { type: String, required: true},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}],
  content: String,
})

const Notification = model('notifications', notification)

export default Notification

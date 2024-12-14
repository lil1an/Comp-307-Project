import mongoose from 'mongoose'
const { Schema, model } = mongoose

// If it's a meeting being updated, hostUpdatedMeeting MUST be provided
// so that we know whether to notify the host or attendees

// To Do: when Lilan creates meetings, change time type: String to the proper type

const notification = new Schema({
  meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: false },
  hostUpdatedMeeting: { type: Boolean, required: false },
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: false },
  time: { type: String, required: true},
  users: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  content: String,
})

const Notification = model('notifications', notification)

export default Notification

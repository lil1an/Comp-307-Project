import mongoose from 'mongoose'
const { Schema, model } = mongoose

const notification = new Schema({
  time: { type: Date, required: true, default: Date.now},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}],
  content: String,
  meeting: {type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: true},
  type: { type: String, required: true}
})

const Notification = model('notifications', notification)

export default Notification

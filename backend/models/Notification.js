import mongoose from 'mongoose'
const { Schema, model } = mongoose

const notification = new Schema({
  time: { type: String, required: true},
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true}],
  content: String,
})

const Notification = model('notifications', notification)

export default Notification

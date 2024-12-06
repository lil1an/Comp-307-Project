import mongoose from 'mongoose'
import Meeting from './Meeting'
import Request from './Request'
const { Schema, model } = mongoose

const notification = new Schema({
  meeting: { type: Meeting, required: false },
  hostUpdatedMeeting: { type: Boolean, required: false },
  request: { type: Request, required: false },
  time: { type: DateTime, required: true}
})

const Notification = model('notifications', notification)

export default Notification

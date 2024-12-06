import mongoose from 'mongoose'
import Meeting from './Meeting'
import User from './User'
const { Schema, model } = mongoose

const request = new Schema({
  meeting: { type: Meeting, required: true },
  availabilities: { type: Array, required: true },
  userAsking: { type: [User, Array], required: true },
  userAnswering: { type: User, required: true },
  userAnsweringResponse: { type: Boolean, required: false },
})

const Request = model('requests', request)

export default Request

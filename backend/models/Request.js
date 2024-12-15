import mongoose from 'mongoose'
const { Schema, model } = mongoose

// note: requests should provide either a user asking account or an email (if there is no account)

const request = new Schema({
  meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'meetings', required: true },
  availabilities: { type: Array, required: true },
  userAskingAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
  userAskingEmail: { type: String, required: false },
  userAnswering: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  userAnsweringResponse: { type: Boolean, required: false },
  date: { type: String, required: true },
  starttime: { type: String, required: false },
  endtime: { type: String, required: false },
})

const Request = model('Request', request)

export default Request

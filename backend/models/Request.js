import mongoose from 'mongoose'
const { Schema, model } = mongoose

const request = new Schema({
  meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: true },
  availabilities: { type: Array, required: true },
  userAsking: { 
    type: Schema.Types.Mixed, 
    required: true,
    validate: {
      validator: function(value) {
        return typeof value === 'string' || Array.isArray(value);
      },
      message: 'userAsking must be either a string or an array of ObjectIds.',
    },
  },
  userAnswering: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userAnsweringResponse: { type: Boolean, required: false },
})

const Request = model('Request', request)

export default Request

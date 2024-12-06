import mongoose from 'mongoose'
const { Schema, model } = mongoose

const user = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: false },
})

const User = model('users', user)

export default User

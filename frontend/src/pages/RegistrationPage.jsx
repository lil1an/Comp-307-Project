// Vincent St-Pierre
import NavBar from '../components/NavBar'
import '../css/registration-page.css'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function RegistrationPage() {
  // User data accessible from here. We need to change user data when changes in the form occur.
  const [firstName, setFirstName] = useState('') // User fields initialization
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate() // Tool to utilize routes.

  // Error popup for registration
  const [statusPopup, setStatusPopup] = useState('')
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const showStatusPopup = (status) => {
    setStatusPopup(status) // Loading the appropriate error message!
    setIsPopupVisible(true)
  }

  const hideStatusPopup = (status) => {
    setIsPopupVisible(false)
  }

  // Function to handle User Form Submission.
  const SubmitForm = (event) => {
    event.preventDefault() // Prevents submit button to reload page.

    // Axios posting to our user route for registering user in the database
    axios
      .post('/server/users/create', { firstName, lastName, email, password })
      .then((result) => {
        showStatusPopup('Registration Successful! Redirecting to Login Page...')
        setTimeout(() => navigate('/login'), 3000)
      })
      .catch((err) => {
        // Error catching for User Already Exists error from our backend
        if (
          err.response?.status === 400 &&
          err.response?.data?.error === 'User already exists'
        ) {
          showStatusPopup('Error: E-mail already registered!')
        } else {
          showStatusPopup('Something went wrong. Please try again later.')
        }
      })
  }
  return (
    <>
      <NavBar />
      <div className="registration-container">
        <div className="registration-box">
          <h2 className="registration-title">Sign Up</h2>
          <form className="registration-info" onSubmit={SubmitForm}>
            <input
              type="text"
              placeholder="First Name"
              className="registration-input"
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="registration-input"
              onChange={(event) => setLastName(event.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="registration-input"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="registration-input"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button type="submit" className="registration-button">
              Register
            </button>
          </form>
        </div>
      </div>

      {/* Status Popup message*/}
      {isPopupVisible && (
        <div className="status-popup">
          <p>{statusPopup}</p>
          <button className="popup-close" onClick={hideStatusPopup}>
            &times;
          </button>
        </div>
      )}
    </>
  )
}

export default RegistrationPage

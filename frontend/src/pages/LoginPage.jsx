import NavBar from '../components/NavBar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState, React } from 'react'
import '../css/login-page.css'

function LoginPage() {
  // user fields for login
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  // Error popup for login
  const [statusPopup, setStatusPopup] = useState('')
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const showStatusPopup = (status) => {
    setStatusPopup(status) // Loading the appropriate error message!
    setIsPopupVisible(true)
  }

  const hideStatusPopup = (status) => {
    setIsPopupVisible(false)
  }

  // Function to handle User Form Submission
  const SubmitForm = (event) => {
    event.preventDefault() // Prevents submit button to reload page.

    axios
      .post('/users/login', { email, password })
      .then((result) => {
        localStorage.setItem('userId', result.data.id)
        navigate('/home')
      })
      .catch((err) => {
        // Error catching for email not registered error from our backend
        if (err.response?.status === 404) {
          showStatusPopup('Error: Login Information Incorrect.')
        } else {
          showStatusPopup('Something went wrong. Please try again later.')
        }
      })
  }
  return (
    <>
      <NavBar />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Sign In</h2>
          <form className="login-info" onSubmit={SubmitForm}>
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="login-links">
            <p>
              Don’t have an account?{' '}
              <Link to="/registration" className="login-link">
                Sign up here
              </Link>
            </p>
            {/* <p>
              Forgot password? <a href="#" className="login-link">Click here</a>
            </p> */}
          </div>
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

export default LoginPage

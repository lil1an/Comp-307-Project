import NavBar from '../components/NavBar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, React } from 'react';
import '../css/login-page.css';

function LoginPage() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  // Function to handle User Form Submission
  const SubmitForm = (event) => {
    event.preventDefault(); // Prevents submit button to reload page.
    
    axios.post( 'http://localhost:8080/users/login', {email, password})
    .then(result => {
        navigate('/home', { state: {firstName: result.data.firstName}});
    })
    .catch((err) => {
      // Error catching for email not registered error from our backend
      if (err.response?.status === 404) {
        alert("Error: Login Information Incorrect.");
      }
      else {
        alert('Something went wrong. Please try again later.');
      }
    });

  }
  return (
    <>
      <NavBar />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Sign In</h2>
          <form className="login-info" onSubmit={SubmitForm}>
            <input type="email" placeholder="Email" className="login-input"
              onChange={(event) => setEmail(event.target.value)} required/>
            <input type="password" placeholder="Password" className="login-input" required
              onChange={(event) => setPassword(event.target.value)} />
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="login-links">
            <p>
              Don’t have an account? <a href="#" className="login-link">Sign up here</a>
            </p>
            <p>
              Forgot password? <a href="#" className="login-link">Click here</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;


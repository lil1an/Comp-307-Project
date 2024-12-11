import NavBar from '../components/NavBar';
import '../css/registration-page.css';
import React, { useReact, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function RegistrationPage() {
    
  // User data accessible from here. We need to change user data when changes in the form occur.
  const [firstName, setFirstName] = useState(''); // User fields initialization
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate() // Tool to utilize routes.

  // Function to handle User Form Submission.
  const SubmitForm = (event) => {
    event.preventDefault(); // Prevents submit button to reload page.
    
    // Axios posting to our user route for registering user in the database
    axios.post( 'http://localhost:8080/userConnection/register', {firstName, lastName, email, password})
    .then(result => {
          alert("Registered successfully! Please Login to proceed.")
          navigate('/login');
    })
    .catch((err) => {

      // Error catching for User Already Exists error from our backend
      if (err.response?.status === 400 && err.response?.data?.error === "User already exists") {
        alert("Error: E-mail already registered!");
      }
      else {
        alert('Something went wrong. Please try again later.');
      }
    });

  }
  return (
    <>
      <NavBar />
      <div className="registration-container">
        <div className="registration-box">
          <h2 className="registration-title">Sign Up</h2>
          <form className="registration-info" onSubmit={SubmitForm}> 
            <input type="text" placeholder="First Name" className="registration-input" 
              onChange={(event) => setFirstName(event.target.value)} required/>
            <input type="text" placeholder="Last Name" className="registration-input" 
              onChange={(event) => setLastName(event.target.value)} required/>
            <input type="email" placeholder="Email" className="registration-input"
              onChange={(event) => setEmail(event.target.value)} required/>
            <input type="password" placeholder="Password" className="registration-input"
              onChange={(event) => setPassword(event.target.value)} required/>
            <button type="submit" className="registration-button">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegistrationPage;


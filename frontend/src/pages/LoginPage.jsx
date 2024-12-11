import NavBar from '../components/NavBar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../css/login-page.css';

function LoginPage() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  // Function to handle User Form Submission. -> Similar to registration.
  const SubmitForm = (event) => {
    event.preventDefault(); // Prevents submit button to reload page.
    
    axios.post( 'http://localhost:8080/userConnection/login', {email, password})
    .then(result => {
        console.log(result);
        if(result.data === "Already registered"){
            alert("E-mail already registered! Please Login to proceed.");
            navigate('/login');
        }
        else{
            alert("Registered successfully! Please Login to proceed.")
            navigate('/login');
        }
        
    })
    .catch(err => console.log(err));
    // End of template code
    //

  }
  return (
    <>
      <NavBar />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Sign In</h2>
          <form className="login-info">
            <input type="email" placeholder="Email" className="login-input" />
            <input type="password" placeholder="Password" className="login-input" />
            <Link to="/home" className="login-button">Login</Link>
            {/*<button type="submit" className="login-button">Login</button>*/}
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


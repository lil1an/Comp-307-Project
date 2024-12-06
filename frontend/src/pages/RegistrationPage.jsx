import NavBar from '../components/NavBar';
import { Link, useLocation } from 'react-router-dom'
import '../css/registration-page.css';

function RegistrationPage() {
  return (
    <>
      <NavBar />
      <div className="registration-container">
        <div className="registration-box">
          <h2 className="registration-title">Sign Up</h2>
          <form className="registration-info">
            <input type="text" placeholder="First Name" className="registration-input" />
            <input type="text" placeholder="Last Name" className="registration-input" />
            <input type="email" placeholder="Email" className="registration-input" />
            <input type="password" placeholder="Password" className="registration-input" />
            <Link to="/home" className="registration-button">Register</Link>
            {/*<button type="submit" className="register-button">Register</button>*/}
          </form>
        </div>
      </div>
    </>
  );
}

export default RegistrationPage;


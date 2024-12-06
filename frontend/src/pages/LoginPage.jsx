import NavBar from '../components/NavBar';
import { Link, useLocation } from 'react-router-dom'
import '../css/login-page.css';

function LoginPage() {
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


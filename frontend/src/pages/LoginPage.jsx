import NavBar from '../components/NavBar';
import { Link, useLocation } from 'react-router-dom'
import '../css/login-page.css';

function LoginPage() {
  return (
    <>
      <NavBar />
      <div class="login-container">
        <div class="login-box">
          <h2 class="login-title">Sign In</h2>
          <form class="login-info" action="http://localhost:3000/home" method="POST">
            <input type="email" placeholder="Email" class="login-input" />
            <input type="password" placeholder="Password" class="login-input" />
            <Link to="/home" class="login-button">Login</Link>
            {/*<button type="submit" class="login-button">Login</button>*/}
          </form>
          <div class="login-links">
            <p>
              Don’t have an account? <a href="#" class="login-link">Sign up here</a>
            </p>
            <p>
              Forgot password? <a href="#" class="login-link">Click here</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;


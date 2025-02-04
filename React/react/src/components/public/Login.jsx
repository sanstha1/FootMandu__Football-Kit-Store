import React from 'react';
import '../css/login.css';
import { Link } from 'react-router-dom';

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <div className="Container">
      <div className="Header">
        <div className="imagecontainer">
          <img src="./Images/logo3.png" alt="logo" />
        </div>
        <ul>
          <li><Link to="#">Home</Link></li>
          <li><button className="button">SIGN UP</button></li>
        </ul>
        <div className="user">
          <img src="./Images/icons8-user-48.png" alt="icon" />
        </div>
      </div>
      <div className="Form">
        <form onSubmit={handleSubmit}>
          <h1>LOG IN</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input"
          />
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="#">Forgot Password?</Link>
          </div>

          <button type="submit" className="btn">LOG IN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

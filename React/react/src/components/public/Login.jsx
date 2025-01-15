import React from 'react';
import '../css/login.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="container">
      <div className="header">
        <div className="image-container">
          <img src="/Images/logo3.png" alt="logo" />
        </div>
        <ul>
          <li>Home</li>
        </ul>
        <button type="submit" className='buttonsignup'>SIGN UP</button>
        <div className="user">
          <img src="/Images/icons8-user-48.png" alt="user icon" />
        </div>
      </div>
      <div className="couple">
        <img src="/Images/Image.png" alt="couple" />
      </div>
      <div className="form">
        <form>
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
            <label><input type="checkbox" /> Remember me</label>
            <a>Forgot Password?</a>
          </div>
          <button type="submit" className="btn">LOG IN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

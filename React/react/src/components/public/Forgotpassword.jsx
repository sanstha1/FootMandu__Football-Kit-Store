import React from 'react';
import { Link } from 'react-router-dom';
import '../css/forgotpassword.css';

function Forgotpassword() {
  return (
    <div className="Container">
      <div className="Header">
        <div className="imagecontainer">
          <img src="./Images/logo3.png" alt="logo" />
        </div>
        <ul>
          <li>
            <button className="button">LOG IN</button>
          </li>
        </ul>
        <div className="user">
          <img src="/Images/home.jpg" alt="home" />
        </div>
      </div>
      <div className="Form">
        <form action="">
          <h1>Forgot Password ?</h1>
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="password"
            className="input"
          />
          <button type="submit" className="btn">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgotpassword;

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/dashboard.css';

function Dashboard() {
  return (
    <div className="Container">
      <div className="Header">
        <div className="imagecontainer">
          <img src="./Images/logo3.png" alt="logo" />
        </div>
        <div className="logoname">
          <h1>FootMandu</h1>
        </div>
        <div className="user">
          <img src="./Images/icons8-user-48.png" alt="user icon" />
        </div>
      </div>
      <div className="girlimage">
        <img src="./Images/footballkick.png" alt="football kick" />
      </div>
      <div className="Information">
        <h1>Gear Up, Step Out, Rule the Pitch!</h1>
        <p>Quality shouldn't be compromised</p>
        <button type="button" onClick={() => (window.location.href = '#')}>
          LOG IN
        </button>
        <button type="button" onClick={() => (window.location.href = '#')}>
          REGISTER
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

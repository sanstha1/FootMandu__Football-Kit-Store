import 'react';
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
          <Link to="/adminlogin"><img src="./Images/icons8-user-48.png" alt="admin icon" /></Link>
        </div>
      </div>
      <div className="girlimage">
        <img src="./Images/footballkick.png" alt="football kick" />
      </div>
      <div className="Information">
        <h1>Gear Up, Step Out, Rule the Pitch!</h1>
        <p>Quality shouldn&apos;t be compromised</p>
        <button type="button" onClick={() => (window.location.href = '/login')}>
          LOG IN
        </button>
        <button type="button" onClick={() => (window.location.href = '/register')}>
          REGISTER
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

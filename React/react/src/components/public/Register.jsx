import React from 'react';
import { Link } from 'react-router-dom';
import '../css/register.css';


function Register() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic
      };
    return (
        <div className="Container">
                <div className="Header">
                        <div className="imagecontainer">
                                <img src="./Images/logo3.png" alt="logo"/>
                        </div>
                        <ul>
                                <li><a href="/">Home</a></li>
                                <li><button className="button">LOG IN</button></li>
                        </ul>
                        <div className="user">
                                <img src="./Images/icons8-user-48.png" alt="icon"/>
                        </div>
                </div>
                <div className="Form">
                        <form onSubmit={(e) => e.preventDefault()}>
                                <h1>SIGN UP</h1>
                                <input
                                type="text"
                                placeholder="Full Name"
                                name="fullname"
                                className="input"/>

                                <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                className="input"/>

                                <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="input"/>

                                <input
                                type="password"
                                placeholder="Confirm Password"
                                name="password"
                                className="input"/>

                                <button type="submit" className="btn">SIGN UP</button>
                        </form>
                </div>
        </div>
    );
}

export default Register;

import React from 'react';
import { useForm } from 'react-hook-form';
import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../css/login.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [message, setMessage] = useState("");



  const onSubmit = async (data) => {
    try {
      console.log("Sending login request with data:", data);

      const response = await Axios.post("http://localhost:4000/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      console.log("Response received:", response.data);

      if (response.status === 200) {
        const token = response.data.data?.access_token; 
        if (!token) {
          setMessage("Error: Token not found in response.");
          console.error("Token not found in response:", response.data);
          return;
        }
        console.log("Token received from server:", token); 
        localStorage.setItem("token", token); 
        console.log("Token saved in localStorage:", localStorage.getItem("token")); 
        setMessage("Login successful!");
        alert("Login successful!");
        navigate("/mainpage");
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response?.data?.message || 'Please try again later.'}`);
      } else if (error.request) {
        setMessage("No response from server. Please try again later.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="Container">
      <div className="Header">
        <div className="imagecontainer">
          <img src="./Images/logo3.png" alt="logo" />
        </div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><button className="button" onClick={() => (window.location.href = '/register')}>SIGN UP</button></li>
        </ul>
        <div className="user">
          <img src="./Images/icons8-user-48.png" alt="icon" />
        </div>
      </div>
      <div className="Form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>LOG IN</h1>

          
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className="input"
          />
          {errors.email && <p style={{ color: "red", margin: "6px" }}>{errors.email.message}</p>}

          
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
            className="input"
          />
           <botton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </botton>
                   
          {errors.password && <p style={{ color: "red", margin: "6px" }}>{errors.password.message}</p>}

          
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>

         
          <button type="submit" className="btn">LOG IN</button>
          {message && <p style={{ color: "red", margin: "6px" }}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
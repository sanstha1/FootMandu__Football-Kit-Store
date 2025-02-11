import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../css/forgotpassword.css'; 
import Axios from 'axios';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Forgotpassword() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRetypePassword, setShowRetypePassword] = React.useState(false);

  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post("http://localhost:4000/api/auth/resetPassword", {
        email: data.email,
        newPassword: data.password,
      });

      if (response.status === 200) {
        setMessage("Password successfully updated!");
        alert("Password reset successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response?.data?.message || "Please try again."}`);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };



  return (
    <div className="Container">
      <div className="Header">
        <div className="imagecontainer">
          <img src="/Images/logo3.png" alt="logo" />
        </div>
        <ul>
                <li><button className="button" onClick={() => (window.location.href = '/login')}>LOG IN</button></li>
            </ul>
        <div className="home">
          <Link to="/"><img src="/Images/home.jpg" alt="home" /></Link>
        </div>
      </div>
      <div className="Form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Forgot Password ?</h1>

          
          <div>
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
            {errors.email && <p style={{ color: "red" ,margin:"0"}}>{errors.email.message}</p>}
          </div>

         
          <div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
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
            {errors.password && <p style={{ color: "red" ,margin:"0"}}>{errors.password.message}</p>}
          </div>

          
          <div>
            <input
              id="confirmPassword"
              type={showRetypePassword ? 'text' : 'password'}
              placeholder="Re-enter Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              className="input"
            />
            <botton
              type="button"
              onClick={() => setShowRetypePassword(!showRetypePassword)}
              className="eye-icon"
            >
              {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
            </botton>
            {errors.confirmPassword && <p style={{ color: "red" ,margin:"0" }}>{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="btn">
            Reset
          </button>
          {message && <p style={{ color: message.includes("Error") ? "red" : "green", margin: "10px" }}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Forgotpassword;
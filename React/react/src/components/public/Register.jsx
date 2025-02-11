import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../css/register.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post("http://localhost:4000/api/auth/create", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        setMessage("User successfully registered!");
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Error registering user: ${error.response.data?.message || 'Please try again later.'}`);
      } else if (error.request) {
        setMessage("No response from server. Please try again later.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
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
          <li><button className="button" onClick={() => (window.location.href = '/login')}>LOG IN</button></li>
        </ul>
        <div className="user">
          <img src="./Images/icons8-user-48.png" alt="icon" />
        </div>
      </div>
      <div className="Form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>SIGN UP</h1>

          <input
            id='fullname'
            type="text"
            placeholder="Full Name"
            {...register("name", {
              required: "Full name is required",
            })}
            className="input"
          />
          {errors.name && <p style={{ color: "red", margin: "0" }}>{errors.name.message}</p>}

          <input
            id='email'
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
          {errors.email && <p style={{ color: "red", margin: "0" }}>{errors.email.message}</p>}

          <div className="password-field">
            <input
              id='password'
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
              className="toggle-password-btn"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </botton>
          </div>
          {errors.password && <p style={{ color: "red", margin: "0" }}>{errors.password.message}</p>}

          <div className="password-field">
            <input
              id='password'
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              className="input"
            />
            <botton
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="toggle-password-btn"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </botton>
          </div>
          {errors.confirmPassword && <p style={{ color: "red", margin: "0" }}>{errors.confirmPassword.message}</p>}

          <button type="submit" className="btn">SIGN UP</button>
        </form>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </div>
    </div>
  );
}

export default Register;

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../css/forgotpassword.css'; 
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Forgotpassword() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRetypePassword, setShowRetypePassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(`Password Reset Request: ${JSON.stringify(data)}`);
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
        </form>
      </div>
    </div>
  );
}

export default Forgotpassword;
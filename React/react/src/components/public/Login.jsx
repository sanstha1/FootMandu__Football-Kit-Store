import 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
// import Axios from 'axios';
import '../css/login.css';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(`Password Reset Request: ${JSON.stringify(data)}`);
  };

  
  // const onSubmit = async (data) => {
  //   try {
  //     const response = await Axios.post("http://localhost:4000/api/auth/login", data);
  //     const { access_token } = response.data;

  //     if (access_token) {
  //       // Save token to localStorage
  //       localStorage.setItem("token", access_token);

  //       // Redirect to home or dashboard
  //       window.location.href = "/";
  //     } else {
  //       alert("Login failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert(error.response?.data?.message || "An error occurred during login.");
  //   }
  // };

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
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
            className="input"
          />
          {errors.password && <p style={{ color: "red", margin: "6px" }}>{errors.password.message}</p>}

          
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>

         
          <button type="submit" className="btn">LOG IN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
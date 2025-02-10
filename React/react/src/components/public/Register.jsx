import 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
// import Axios from 'axios';
import '../css/register.css';

function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
        alert(`Password Reset Request: ${JSON.stringify(data)}`);
      };

  
//   const onSubmit = async (data) => {
//     try {
//       const response = await Axios.post("http://localhost:4000/api/auth/create", data);
//       const { access_token } = response.data;

//       if (access_token) {
       
//         localStorage.setItem("token", access_token);

        
//         window.location.href = "/login";
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "An error occurred during registration.");
//     }
//   };



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
            type="text"
            placeholder="Full Name"
            {...register("name", {
              required: "Full name is required",
            })}
            className="input"
          />
          {errors.name && <p style={{ color: "red", margin: "0" }}>{errors.name.message}</p>}

          
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
          {errors.email && <p style={{ color: "red", margin: "0" }}>{errors.email.message}</p>}

          
          <input
            type="password"
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
          {errors.password && <p style={{ color: "red", margin: "0" }}>{errors.password.message}</p>}

          
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            className="input"
          />
          {errors.confirmPassword && <p style={{ color: "red", margin: "0" }}>{errors.confirmPassword.message}</p>}

          
          <button type="submit" className="btn">SIGN UP</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
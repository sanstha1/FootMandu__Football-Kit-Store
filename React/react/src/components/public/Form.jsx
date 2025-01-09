import React from "react";
import { useForm } from "react-hook-form";
 
const SimpleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const onSubmit = (data) => {
    console.log(data);
    alert(`Form Submitted: ${JSON.stringify(data)}`);
  };
 
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Simple Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Input */}
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            {...register("name", { required: "Plese input your name" })}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
 
        {/* Email Input */}
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
 
        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
 
export default SimpleForm;
import  { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/booknow.css'


function Booknow() {
    const [formData, setFormData] = useState({
        fullname: "",
        number: "",
        productname: "",
        quantity: "",
        price: "",
      });
    
      const [message, setMessage] = useState("");
      const navigate = useNavigate(); 
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleBuying = () => {
        if (
          formData.fullname &&
          formData.number &&
          formData.productname&&
          formData.quantity &&
          formData.price
        ) {
          setMessage("Your Tour Has Been Booked.");
          
          setTimeout(() => navigate('/tour-crud'), 2000); 
        } else {
          setMessage("Please fill out all fields");
        }
      };
    
      const handleGoToProductPage = () => {
        navigate('/trip-booking'); 
      };
  return (
    <div className="buying-container">
      <h1>Book Now</h1>

      <div className="qr-code-section">
        <div className="qr-placeholder">
          <img src="/Images/qr.png" alt="qr"/>
        </div>
      </div>

      <div className="Form">
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.fullname}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Number:</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="category"
            value={formData.productname}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
      </div>

      <button onClick={handleBuying}>Buy Now</button><br />
      <button onClick={handleGoToProductPage}>Go to Product Page</button>

      {message && <div className="alert-box">{message}</div>}
    </div>
  )
}

export default Booknow;
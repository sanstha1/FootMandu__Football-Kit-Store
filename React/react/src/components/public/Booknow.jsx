import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/booknow.css';

function Booknow() {
  const location = useLocation();
  const navigate = useNavigate();
  const { productName: initialProductName, price: basePrice } = location.state || {};

  // Initialize form data with product details
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    productName: initialProductName || "",
    quantity: 1,
    price: basePrice || 0,
  });

  const [message, setMessage] = useState("");

  // Validate contact number
  const validateContactNumber = (value) => {
    const regex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
    return regex.test(value);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      const newQuantity = parseInt(value, 10);
      const newPrice = basePrice && newQuantity > 0 ? basePrice * newQuantity : basePrice || 0;
      setFormData((prevData) => ({
        ...prevData,
        quantity: newQuantity,
        price: newPrice,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBuying = async () => {
    let errorMessage = "";
    if (!formData.name) errorMessage += "Name is required. ";
    if (!validateContactNumber(formData.contactNumber)) errorMessage += "Invalid contact number. ";
    if (!formData.productName) errorMessage += "Product name is required. ";
    if (formData.quantity <= 0) errorMessage += "Quantity must be greater than 0. ";
    if (!formData.price) errorMessage += "Price is required. ";
  
    if (errorMessage) {
      setMessage(errorMessage.trim());
      return;
    }
  
    try {
      // Save the order to the database
      await fetch("http://localhost:4000/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      setMessage("Your order has been placed successfully!");
      setTimeout(() => navigate('/mainpage'), 2000);
    } catch (error) {
      setMessage("Failed to place the order. Please try again.");
    }
  };

  // Navigate back to the product page
  const handleGoToProductPage = () => {
    navigate('/mainpage');
  };

  return (
    <div className="buying-container">
      <h1>Buy Now</h1>
      <div className="qr-code-section">
        <div className="qr-placeholder">
          <img src="/Images/qr.png" alt="QR Code" />
        </div>
      </div>
      <div className="Form">
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            aria-label="Full Name"
          />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            aria-label="Contact Number"
          />
        </div>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            readOnly
            aria-label="Product Name"
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            aria-label="Quantity"
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            readOnly
            aria-label="Price"
          />
        </div>
      </div>
      <button onClick={handleBuying} aria-label="Buy Now">Buy Now</button><br />
      <button onClick={handleGoToProductPage} aria-label="Go to Product Page">Go to Product Page</button>
      {message && <div className="alert-box">{message}</div>}
    </div>
  );
}

export default Booknow;
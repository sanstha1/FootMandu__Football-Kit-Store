import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/addtocart.css'

function Addtocart() {
  const location = useLocation();
  const navigate = useNavigate();

  
  const { productName, price: basePrice } = location.state || {};

  
  const [formData, setFormData] = useState({
    productName: productName || "",
    quantity: 1,
    price: basePrice || 0,
  });

  const [message, setMessage] = useState("");

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  const handleaddtocart = async () => {
    try {
     
      await axios.post('http://localhost:4000/api/cart', formData);

      
      setMessage("Product added to cart successfully!");

      
      setTimeout(() => {
        navigate("/mainpage");
      }, 2000);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setMessage("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <div className="addtocart-container">
      <h1>Add to Cart</h1>
      <div className="Form">
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
            value={formData.price * formData.quantity} 
            readOnly
            aria-label="Price"
          />
        </div>
      </div>
      <button onClick={handleaddtocart} aria-label="Add to Cart">
        Add to Cart
      </button>
      <br />

      {message && <div className="alert-box">{message}</div>}
    </div>
  );
}

export default Addtocart;
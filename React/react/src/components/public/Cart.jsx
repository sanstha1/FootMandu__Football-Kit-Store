import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/cart.css';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '', 
    contactNumber: '',
    productName: '',
    quantity: '',
    price: '',
  });

  // Fetch authentication token
  const getAuthHeader = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please log in first.");
      navigate('/login');
      return {};
    }
    return { Authorization: `Bearer ${token}` };
  }, [navigate]);

  // Fetch all cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/cart", {
          headers: getAuthHeader(),
        });
        setCartItems(response.data.data);
      } catch (error) {
        if (error.response?.status === 401) {
          alert("You are not logged in. Please log in first.");
          navigate('/login');
        } else {
          alert("Failed to fetch cart items. Please try again later.");
        }
      }
    };
    fetchCartItems();
  }, [navigate, getAuthHeader]);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data before submission
  const validateFormData = () => {
    if (Object.values(formData).some(value => !value)) {
      alert('All fields must be filled!');
      return false;
    }
    if (!/^\d+$/.test(formData.contactNumber)) {
      alert('Invalid contact number');
      return false;
    }
    if (formData.quantity <= 0 || !Number.isInteger(Number(formData.quantity))) {
      alert('Quantity must be a positive integer');
      return false;
    }
    if (formData.price <= 0 || isNaN(parseFloat(formData.price))) {
      alert('Price must be a positive number');
      return false;
    }
    return true;
  };

  // Handle Checkout (Add to Bought and Remove from Cart)
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!validateFormData()) {
      return;
    }

    try {
      // Step 1: Add the item to the "Bought" backend
      const boughtResponse = await axios.post(
        "http://localhost:4000/api/product", 
        formData,
        { headers: getAuthHeader() }
      );

      if (boughtResponse.status === 201) {
        alert("Item successfully checked out!");

        // Step 2: Remove the item from the cart
        if (editingIndex !== null) {
          const cartId = cartItems[editingIndex].cartId;
          const deleteResponse = await axios.delete(
            `http://localhost:4000/api/cart/${cartId}`,
            { headers: getAuthHeader() }
          );

          if (deleteResponse.status === 200) {
            setCartItems(cartItems.filter((_, i) => i !== editingIndex));
            resetForm();
            alert("Item removed from cart!");
          }
        } else {
          alert("No item selected for checkout.");
        }
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      if (error.response?.status === 401) {
        alert(error.response?.data?.message || "Unauthorized access");
        navigate('/login');
      } else {
        alert(error.response?.data?.message || "An error occurred during checkout.");
      }
    }
  };

  // Reset the form and editing state
  const resetForm = () => {
    setFormData({
      name: '',
      contactNumber: '',
      productName: '',
      quantity: '',
      price: '',
    });
    setEditingIndex(null);
  };

  // Pre-fill the form for editing a cart item
  const handleEdit = (index) => {
    const cartItem = cartItems[index];
    setFormData({
      name: cartItem.name,
      contactNumber: cartItem.contactNumber,
      productName: cartItem.productName,
      quantity: cartItem.quantity,
      price: cartItem.price,
    });
    setEditingIndex(index);
  };

  // Delete a cart item
  const handleDelete = async (index) => {
    if (window.confirm('Are you sure you want to delete this cart item?')) {
      try {
        const cartId = cartItems[index].cartId;
        const response = await axios.delete(`http://localhost:4000/api/cart/${cartId}`, {
          headers: getAuthHeader(),
        });
        if (response.status === 200) {
          setCartItems(cartItems.filter((_, i) => i !== index));
          alert("Cart item deleted successfully!");
        } else {
          alert("Failed to delete cart item");
        }
      } catch (error) {
        if (error.response?.status === 401) {
          alert("Unauthorized access. Please log in again.");
          navigate('/login');
        } else {
          alert(error.response?.data?.message || "An error occurred");
        }
      }
    }
  };

  return (
    <div className="container">
     
      <div className="back">
        <Link to="/mainpage"><img src="/Images/arrow.jpg" alt="back" /></Link>
      </div>
      <div className="logout">
        <Link to="/login"><img src="/Images/logout.png" alt="logout" /></Link>
      </div>

      <form autoComplete="off" onSubmit={handleCheckout}>
        <h3>{editingIndex !== null ? "Checkout Cart Item" : "Add New Cart Item"}</h3>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Total Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="button">
          <input type="submit" value={editingIndex !== null ? "Checkout" : "Add"} />
          <input type="reset" value="Clear" onClick={resetForm} />
        </div>
      </form>

      
      <div className="scroll-table">
        <table className="list">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <tr key={item.cartId}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Checkout</button>
                    <button onClick={() => handleDelete(index)}>Remove</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">Your cart is empty</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cart;
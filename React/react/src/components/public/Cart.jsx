import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/cart.css'

function Cart() {
  // State to hold the cart items
  const [cart, setCart] = useState([]);

  // Initialize navigate from react-router-dom
  const navigate = useNavigate();

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    // Initialize quantity for each item if not already present
    const initializedCart = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1, // Default quantity is 1
    }));
    setCart(initializedCart);
  }, []);

  // Update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Handle checkout
  const handleCheckout = () => {
    alert('Checkout successful!');
    localStorage.removeItem('cart');
    setCart([]); // Clear the cart in state
  };

  // Handle close button
  const handleClose = () => {
    navigate('/'); // Navigate to the home/main page using React Router
  };

  // Increase quantity of an item
  const increaseQuantity = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Decrease quantity of an item
  const decreaseQuantity = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  return (
    <div className="Container">
      <div className="cart">
        <h1>Cart</h1>
        <div className="listcart">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div className="item" key={index}>
                <div className="image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="name">{item.name}</div>
                <div className="totalprice">{item.price}</div>
                <div className="quantity">
                  <span
                    className="minus"
                    onClick={() => decreaseQuantity(index)}
                  >
                    &lt;
                  </span>
                  <span>{item.quantity}</span>
                  <span
                    className="plus"
                    onClick={() => increaseQuantity(index)}
                  >
                    &gt;
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="btn">
          <button className="close" onClick={handleClose}>
            CLOSE
          </button>
          <button className="checkOut" onClick={handleCheckout}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

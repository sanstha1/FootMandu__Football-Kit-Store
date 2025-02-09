import { useState } from 'react'
import {  Link } from 'react-router-dom'
import '../css/bought.css'

function Bought() {
  
  const [formData] = useState({
    name: '',
    contactNumber: '',
    productName: '',
    quantity: '',
    price: '',
  });
  return (
    <div className='container'>
      <div className='back'>
      <Link to="/login"><img src="/Images/arrow.jpg" alt="back" /></Link>
      </div>
      <div className="logout">
        <Link to="/login"><img src="/Images/logout.png" alt="logout" /></Link>
      </div>
      <form autoComplete="off" >
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="contactNumber"
          />
        </div>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="Number"
            name="quantity"
          />
        </div>

        <div>
          <label>Total Price</label>
          <input
            type="number"
            name="price"          
          />
        </div>
        <div className="button">
          <input type="submit" value="Update"/>
          <input type="reset" value="Reset"  />
        </div>
      </form>
      <div className='scroll-table'>
      <table className="list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formData.name}</td>
            <td>{formData.contactNumber}</td>
            <td>{formData.productName}</td>
            <td>{formData.quantity}</td>
            <td>{formData.price}</td>
            <td>
              <button>Edit</button>
              <button>Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Bought
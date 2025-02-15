import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import '../css/bought.css';

function Bought() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    productName: '',
    quantity: '',
    price: '',
  });
  const [records, setRecords] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

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

  // Fetch all bought items on component mount
  useEffect(() => {
    const fetchBoughtItems = async () => {
      try {
        const response = await Axios.get("http://localhost:4000/api/product", {
          headers: getAuthHeader(),
        });
        setRecords(response.data.data);
      } catch (error) {
        if (error.response?.status === 401) {
          alert("You are not logged in. Please log in first.");
          navigate('/login');
        } else {
          alert("Failed to fetch bought items. Please try again later.");
        }
      }
    };
    fetchBoughtItems();
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

  // Handle form submission (create or update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData()) {
      return;
    }

    try {
      if (editingIndex !== null) {
        // Update an existing record
        const productId = records[editingIndex].productId;
        const response = await Axios.put(
          `http://localhost:4000/api/product/${productId}`,
          formData,
          { headers: getAuthHeader() }
        );
        if (response.status === 200) {
          const updatedRecord = response.data.data;
          const newRecords = [...records];
          newRecords[editingIndex] = updatedRecord;
          setRecords(newRecords);
          resetForm();
          alert("Record updated successfully!");
        }
      } else {
        // Create a new record
        const response = await Axios.post(
          "http://localhost:4000/api/product",
          formData,
          { headers: getAuthHeader() }
        );
        if (response.status === 201) {
          setRecords([...records, response.data.data]);
          resetForm();
          alert("Record created successfully!");
        }
      }
    } catch (error) {
      console.error("Error saving record:", error);
      if (error.response?.status === 401) {
        alert(error.response?.data?.message || "Unauthorized access");
        navigate('/login');
      } else {
        alert(error.response?.data?.message || "An error occurred");
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

  // Pre-fill the form for editing a record
  const handleEdit = (index) => {
    const record = records[index];
    setFormData({
      name: record.name,
      contactNumber: record.contactNumber,
      productName: record.productName,
      quantity: record.quantity,
      price: record.price,
    });
    setEditingIndex(index);
  };

  // Delete a record
  const handleDelete = async (index) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const productId = records[index].productId;
        const response = await Axios.delete(`http://localhost:4000/api/product/${productId}`, {
          headers: getAuthHeader(),
        });

        if (response.status === 200) {
          setRecords(records.filter((_, i) => i !== index));
          alert("Record deleted successfully!");
        } else {
          alert("Failed to delete record");
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

      {/* Form for Adding/Editing Records */}
      <form autoComplete="off" onSubmit={handleFormSubmit}>
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
          <label>Phone Number</label>
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
          <input type="submit" value={editingIndex !== null ? "Update" : "Add"} />
          <input type="reset" value="Clear" onClick={resetForm} />
        </div>
      </form>

      {/* Table to Display Records */}
      <div className="scroll-table">
        <table className="list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={record.productId}>
                <td>{record.name}</td>
                <td>{record.contactNumber}</td>
                <td>{record.productName}</td>
                <td>{record.quantity}</td>
                <td>{record.price}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bought;
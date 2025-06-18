// EditIPO.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditIPO() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: "",
    ipo_date: "",
    price: "",
    status: "upcoming",
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/ipos/${id}/`)
      .then(res => setFormData(res.data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company_name.trim() || !formData.ipo_date || formData.price <= 0) {
      alert("❗ Please fill all fields correctly.");
      return;
    }

    axios.put(`http://localhost:8000/api/ipos/${id}/`, formData)
      .then(() => {
        alert("✅ IPO updated successfully!");
        navigate("/");
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center" }}>✏️ Edit IPO</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company_name"
          placeholder="Company Name"
          value={formData.company_name}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "8px 0", padding: "8px" }}
        />
        <input
          type="date"
          name="ipo_date"
          value={formData.ipo_date}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "8px 0", padding: "8px" }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={{ width: "100%", margin: "8px 0", padding: "8px" }}
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={{ width: "100%", margin: "8px 0", padding: "8px" }}
        >
          <option value="upcoming">Upcoming</option>
          <option value="listed">Listed</option>
        </select>
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>
          💾 Update IPO
        </button>
      </form>
    </div>
  );
}

export default EditIPO;

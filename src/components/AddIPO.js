import React, { useState } from "react";

function AddIPO() {
  const [formData, setFormData] = useState({
    company_name: "",
    ipo_date: "",
    price: "",
    status: "upcoming",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.company_name.trim()) newErrors.company_name = "Company name is required";
    if (!formData.ipo_date) newErrors.ipo_date = "IPO date is required";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Price must be greater than 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    fetch("http://localhost:8000/api/ipos/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setSuccessMessage("✅ IPO added successfully!");
        setFormData({
          company_name: "",
          ipo_date: "",
          price: "",
          status: "upcoming",
        });
      });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">➕ Add New IPO</h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Company Name</label>
            <input
              type="text"
              name="company_name"
              className="form-control"
              value={formData.company_name}
              onChange={handleChange}
              required
            />
            {errors.company_name && <div className="text-danger">{errors.company_name}</div>}
          </div>
          <div className="mb-3">
            <label>IPO Date</label>
            <input
              type="date"
              name="ipo_date"
              className="form-control"
              value={formData.ipo_date}
              onChange={handleChange}
              required
            />
            {errors.ipo_date && <div className="text-danger">{errors.ipo_date}</div>}
          </div>
          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              required
            />
            {errors.price && <div className="text-danger">{errors.price}</div>}
          </div>
          <div className="mb-3">
            <label>Status</label>
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="upcoming">Upcoming</option>
              <option value="listed">Listed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100">Add IPO</button>
        </form>
      </div>
    </div>
  );
}

export default AddIPO;

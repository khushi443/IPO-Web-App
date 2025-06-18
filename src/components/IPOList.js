import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function IPOList() {
  const [ipos, setIPOs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date_desc");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/ipos/")
      .then((res) => setIPOs(res.data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this IPO?")) {
      fetch(`http://localhost:8000/api/ipos/${id}/`, {
        method: "DELETE",
      }).then(() => {
        setIPOs(ipos.filter((ipo) => ipo.id !== id));
      });
    }
  };

  const filteredIPOs = ipos
    .filter((ipo) =>
      ipo.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "date_desc") {
        return new Date(b.ipo_date) - new Date(a.ipo_date);
      } else if (sortOption === "date_asc") {
        return new Date(a.ipo_date) - new Date(b.ipo_date);
      } else if (sortOption === "price_asc") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortOption === "price_desc") {
        return parseFloat(b.price) - parseFloat(a.price);
      }
      return 0;
    });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📋 IPO Listings</h2>

      {/* 🔍 Search and Sort */}
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by company name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4 mt-2 mt-md-0">
          <select
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="date_desc">📅 Newest First</option>
            <option value="date_asc">📅 Oldest First</option>
            <option value="price_asc">💰 Price Low to High</option>
            <option value="price_desc">💰 Price High to Low</option>
          </select>
        </div>
      </div>

      {/* 🃏 IPO Cards */}
      {filteredIPOs.length > 0 ? (
        filteredIPOs.map((ipo) => (
          <div key={ipo.id} className="card mb-4 shadow-sm border-0" style={{ borderRadius: "15px" }}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">{ipo.company_name}</h5>
                <span className={`badge ${ipo.status === "upcoming" ? "bg-warning text-dark" : "bg-success"}`}>
                  {ipo.status}
                </span>
              </div>
              <p className="card-text mb-1">📅 <strong>Date:</strong> {ipo.ipo_date}</p>
              <p className="card-text mb-3">💰 <strong>Price:</strong> ₹{ipo.price}</p>
              <Link to={`/ipo/${ipo.id}`} className="btn btn-outline-primary btn-sm me-2">🔍 View</Link>
              <button onClick={() => navigate(`/edit-ipo/${ipo.id}`)} className="btn btn-outline-secondary btn-sm me-2">✏️ Edit</button>
              <button onClick={() => handleDelete(ipo.id)} className="btn btn-outline-danger btn-sm">🗑️ Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-muted">❗ No IPOs found</p>
      )}
    </div>
  );
}

export default IPOList;

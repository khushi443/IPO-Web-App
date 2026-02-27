import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function IPOList() {
  const [ipos, setIPOs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date_desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/ipos/")
      .then((res) => {
        setIPOs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load IPO data. Is backend running?");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this IPO?")) {
      fetch(`http://localhost:8000/api/ipos/${id}/`, {
        method: "DELETE",
      })
        .then(() => {
          setIPOs(ipos.filter((ipo) => ipo.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  const filteredIPOs = Array.isArray(ipos)
    ? ipos
        .filter((ipo) =>
          ipo.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
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
        })
    : [];

  if (loading) {
    return <h3 className="text-center mt-5">Loading IPO data...</h3>;
  }

  if (error) {
    return <h3 className="text-center text-danger mt-5">{error}</h3>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📋 IPO Listings</h2>

      {filteredIPOs.length > 0 ? (
        filteredIPOs.map((ipo) => (
          <div key={ipo.id} className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <h5>{ipo.company_name}</h5>
              <p>Date: {ipo.ipo_date}</p>
              <p>Price: ₹{ipo.price}</p>
              <Link to={`/ipo/${ipo.id}`} className="btn btn-primary btn-sm">
                View
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-muted">No IPOs found</p>
      )}
    </div>
  );
}

export default IPOList;

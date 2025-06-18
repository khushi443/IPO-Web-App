import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function IPODetail() {
  const { id } = useParams();
  const [ipo, setIPO] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/ipos/${id}/`)
      .then((res) => res.json())
      .then((data) => setIPO(data));
  }, [id]);

  if (!ipo) return <p>Loading IPO details...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>{ipo.company_name}</h2>
      <p><strong>Date:</strong> {ipo.ipo_date}</p>
      <p><strong>Price:</strong> ₹{ipo.price}</p>
      <p><strong>Status:</strong> {ipo.status}</p>
    </div>
  );
}

export default IPODetail;

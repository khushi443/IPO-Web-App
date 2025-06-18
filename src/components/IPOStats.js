import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IPOStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    avgPrice: 0,
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/ipos/')
      .then(res => {
        const allIPOs = res.data;
        const total = allIPOs.length;
        const upcoming = allIPOs.filter(ipo => ipo.status === 'upcoming').length;
        const avgPrice = total
          ? (allIPOs.reduce((sum, ipo) => sum + parseFloat(ipo.price), 0) / total).toFixed(2)
          : 0;
        setStats({ total, upcoming, avgPrice });
      });
  }, []);

  return (
    <div style={{
      maxWidth: "400px",
      margin: "auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
      textAlign: "center"
    }}>
      <h2>📊 IPO Statistics</h2>
      <p><strong>Total IPOs:</strong> {stats.total}</p>
      <p><strong>Upcoming IPOs:</strong> {stats.upcoming}</p>
      <p><strong>Average Price:</strong> ₹{stats.avgPrice}</p>
    </div>
  );
};

export default IPOStats;

import React, { useEffect, useState } from "react";

const TestMessage = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8000/api/test/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API failed");
        }
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("API error:", error);
        setMessage("API not responding");
      });
  }, []);

  return (
    <div>
      <h2>Test Message:</h2>
      <p>{message}</p>
    </div>
  );
};

export default TestMessage;

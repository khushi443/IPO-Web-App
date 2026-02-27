import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import IPOList from "./components/IPOList";
import IPODetail from "./components/IPODetail";
import IPOStats from "./components/IPOStats";
import AddIPO from "./components/AddIPO";
import EditIPO from "./components/EditIPO";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={darkMode ? "dark-mode" : ""}>
        
        {/* Navbar */}
        <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">📊 IPO Web App</Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-ipo">Add IPO</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/ipo-stats">Stats</Link>
                </li>
              </ul>

              <button
                className="btn btn-outline-secondary ms-3"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<IPOList />} />
            <Route path="/ipo/:id" element={<IPODetail />} />
            <Route path="/add-ipo" element={<AddIPO />} />
            <Route path="/ipo-stats" element={<IPOStats />} />
            <Route path="/edit-ipo/:id" element={<EditIPO />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;

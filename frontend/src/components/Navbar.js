import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useLogout } from "../pages/Logout";
import { useAuthContext } from "../pages/useAuthContext";
import { Link } from "react-router-dom";
import "../styles/pred_dropdown.css";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <h1>
          <Link to="/dashboard">🧬 Hematology Lab</Link>
        </h1>
        <nav>
          {user ? (
            <>
              <Link to="/dashboard">Home</Link>
              <div className="button-dropdown">
                <div className="dropdown-btn">Prediction Models ▼</div>
                <ul className="dropdown-content">
                  <li><Link to="/dt">Decision Tree</Link></li>
                  <li><Link to="/rf">Random Forest</Link></li>
                  <li><Link to="/svm">Support Vector Machine</Link></li>
                  <li><Link to="/knn">K-Nearest Neighbors</Link></li>
                  <li><Link to="/nb">Gaussian Naive Bayes</Link></li>
                  <li><Link to="/lr">Linear Regression</Link></li>
                  <li><Link to="/models">Compare All Models</Link></li>
                  <li><Link to="/image">Deep Learning Analysis</Link></li>
                </ul>
              </div>
              <span>👤 {user.email}</span>
              <button onClick={handleClick}>Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/">Sign In</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

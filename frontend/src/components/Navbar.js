import React, { useState, useRef, useEffect } from "react";
import { useLogout } from "../pages/Logout";
import { useAuthContext } from "../pages/useAuthContext";
import { Link } from "react-router-dom";
import "../styles/pred_dropdown.css";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClick = () => {
    logout();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="container">
        <h1>
          <Link to="/dashboard">Hematology Lab</Link>
        </h1>
        <nav>
          {user ? (
            <>
              <Link to="/dashboard">Home</Link>
              <div className="button-dropdown">
                <button
                  ref={buttonRef}
                  className="dropdown-btn"
                  onClick={toggleDropdown}
                  type="button"
                >
                  <span>Prediction Models</span>
                  <div className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}></div>
                </button>
                <ul 
                  ref={dropdownRef}
                  className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}
                >
                  <li><Link to="/dt" onClick={handleDropdownItemClick}>Decision Tree</Link></li>
                  <li><Link to="/rf" onClick={handleDropdownItemClick}>Random Forest</Link></li>
                  <li><Link to="/svm" onClick={handleDropdownItemClick}>Support Vector Machine</Link></li>
                  <li><Link to="/knn" onClick={handleDropdownItemClick}>K-Nearest Neighbors</Link></li>
                  <li><Link to="/nb" onClick={handleDropdownItemClick}>Gaussian Naive Bayes</Link></li>
                  <li><Link to="/lr" onClick={handleDropdownItemClick}>Linear Regression</Link></li>
                  <li><Link to="/models" onClick={handleDropdownItemClick}>Compare All Models</Link></li>
                  <li><Link to="/image" onClick={handleDropdownItemClick}>Deep Learning Analysis</Link></li>
                </ul>
              </div>
              <span>👤 {user.email}</span>
              <button onClick={handleClick} type="button">Sign Out</button>
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

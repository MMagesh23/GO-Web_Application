import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/NavigationBar.css";

const NavigationBar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/firstlogo.png" alt="Logo" className="logo-icon" />
        <h2 className="heading-nav">GRUBBER'S OBLIGATION</h2>
      </div>
      <ul className="nav-list">
        {(location.pathname === "/signup" ||
          location.pathname === "/login" ||
          location.pathname === "/") && (
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>
          </li>
        )}
        {!isLoggedIn &&
          location.pathname !== "/jobs" &&
          location.pathname !== "/post-job" &&
          location.pathname !== "/job/manage-jobs" &&
          location.pathname !== "/profile" &&
          location.pathname !== "/profile/edit" &&
          !location.pathname.startsWith("/edit-job/") &&
          !location.pathname.startsWith("/jobs/") && (
            <>
              {location.pathname !== "/signup" && (
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className={`nav-link ${
                      location.pathname === "/signup" ? "active" : ""
                    }`}
                  >
                    Sign Up
                  </Link>
                </li>
              )}
              {location.pathname !== "/login" && (
                <li className="nav-item">
                  <Link
                    to="/login"
                    className={`nav-link ${
                      location.pathname === "/login" ? "active" : ""
                    }`}
                  >
                    Log In
                  </Link>
                </li>
              )}
            </>
          )}

        {/* Render dashboard and logout options if the page is in the dashboard */}
        {(location.pathname === "/jobs" ||
          location.pathname === "/post-job" ||
          location.pathname === "/profile" ||
          location.pathname === "/profile/edit" ||
          location.pathname === "/job/manage-jobs" ||
          location.pathname.startsWith("/edit-job/") ||
          location.pathname.startsWith("/jobs/")) && (
          <>
            <li className="nav-item">
              <Link
                to="/jobs"
                className={`nav-link ${
                  location.pathname === "/jobs" ||
                  location.pathname.startsWith("/jobs/")
                    ? "active"
                    : ""
                }`}
              >
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/post-job"
                className={`nav-link ${
                  location.pathname === "/post-job" ? "active" : ""
                }`}
              >
                Post Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/job/manage-jobs"
                className={`nav-link ${
                  location.pathname === "/job/manage-jobs"
                    ? "active"
                    : "" || location.pathname.startsWith("/edit-job/")
                    ? "active"
                    : ""
                }`}
              >
                Manage Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className={`nav-link ${
                  location.pathname === "/profile"
                    ? "active"
                    : "" || location.pathname === "/profile/edit"
                    ? "active"
                    : ""
                }`}
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                onClick={() => setIsLoggedIn(false)}
              >
                <img
                  src="/logout.png"
                  alt="logout-icon"
                  title="logout"
                  className="logout-icon"
                />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;

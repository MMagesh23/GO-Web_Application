import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthService from "./authService";
import "../style/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = AuthService.getToken(); // Get token from AuthService
        const response = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` }, // Include token in request headers
        });
        setUser(response.data.userDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="container-profile">
      <div className="profile-card">
        <div className="logo-container-profile">
          <img
            src="profile_logo.svg"
            alt="Profile Logo"
            className="logo-profile"
          />
        </div>
        <h1>
          {user.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
        </h1>
        {loading ? (
          <p className="loading-profile">Loading...</p>
        ) : (
          <table className="profile-details">
            <tbody>
              <tr>
                <td>
                  <strong>Gender:</strong>
                </td>
                <td>{user.gender}</td>
              </tr>
              <tr>
                <td>
                  <strong>Date of Birth:</strong>
                </td>
                <td>{user.dob}</td>
              </tr>
              <tr>
                <td>
                  <strong>Age:</strong>
                </td>
                <td>{user.age}</td>
              </tr>
              <tr>
                <td>
                  <strong>Phone:</strong>
                </td>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <td>
                  <strong>Email:</strong>
                </td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>
                  <strong>Address:</strong>
                </td>
                <td>{user.address}</td>
              </tr>
              <tr>
                <td>
                  <strong>District:</strong>
                </td>
                <td>{user.district}</td>
              </tr>
            </tbody>
          </table>
        )}
        <Link to="/profile/edit">
          <button className="edit-button-profile">Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AuthService from "./authService";
import "../style/EditProfile.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    district: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userProfile = await AuthService.getUserProfile();
        setFormData(userProfile.userDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = AuthService.getToken();
      await axios.put("http://localhost:5000/profile/edit", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Profile updated successfully !");
      // Navigate to the profile page after successful update
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          placeholder="Gender"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          placeholder="District"
        >
          <option value="Ariyalur">Ariyalur</option>
          <option value="Chengalpattu">Chengalpattu</option>
          <option value="Chennai">Chennai</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Cuddalore">Cuddalore</option>
          <option value="Dharmapuri">Dharmapuri</option>
          <option value="Dindigul">Dindigul</option>
          <option value="Erode">Erode</option>
          <option value="Kallakurichi">Kallakurichi</option>
          <option value="Kancheepuram">Kancheepuram</option>
          <option value="Karur">Karur</option>
          <option value="Krishnagiri">Krishnagiri</option>
          <option value="Madurai">Madurai</option>
          <option value="Mayiladuthurai">Mayiladuthurai</option>
          <option value="Nagapattinam">Nagapattinam</option>
          <option value="Kanniyakumari">Kanniyakumari</option>
          <option value="Namakkal">Namakkal</option>
          <option value="Perambalur">Perambalur</option>
          <option value="Pudukottai">Pudukottai</option>
          <option value="Ramanathapuram">Ramanathapuram</option>
          <option value="Ranipet">Ranipet</option>
          <option value="Salem">Salem</option>
          <option value="Sivagangai">Sivagangai</option>
          <option value="Tenkasi">Tenkasi</option>
          <option value="Thanjavur">Thanjavur</option>
          <option value="Theni">Theni</option>
          <option value="Thiruvallur">Thiruvallur</option>
          <option value="Thiruvarur">Thiruvarur</option>
          <option value="Thoothukudi">Thoothukudi</option>
          <option value="Trichirappalli">Trichirappalli</option>
          <option value="Thirunelveli">Thirunelveli</option>
          <option value="Tirupathur">Tirupathur</option>
          <option value="Tiruppur">Tiruppur</option>
          <option value="Tiruvannamalai">Tiruvannamalai</option>
          <option value="The Nilgiris">The Nilgiris</option>
          <option value="Vellore">Vellore</option>
          <option value="Viluppuram">Viluppuram</option>
          <option value="Virudhunagar">Virudhunagar</option>
          {/* Rest of the options */}
        </select>
        <button type="submit">Update</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditProfile;

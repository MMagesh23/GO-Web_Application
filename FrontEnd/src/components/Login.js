import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AuthService from "./authService";
import axios from "axios";
import "../style/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    countryCode: "+91",
    phone: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      console.log("Login successful!");
      AuthService.setAuthToken(response.data.token);
      navigate("/jobs");
    } catch (error) {
      console.error("Error logging in:", error.response.data);
      toast.error("Invalid phone number or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h2 className="login-topic">LOGIN</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="phone">
          Phone Number<span className="required">*</span>
        </label>
        <div className="phone-number">
          <select
            id="country-code"
            className="custom-input-login"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
          >
            <option value="+91">+91 (India)</option>
            <option value="+1">+1 (USA)</option>
          </select>
          <input
            type="tel"
            className="custom-input-login"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="password">
          Password<span className="required">*</span>
        </label>
        <div className="password-input-login ">
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            className="custom-input-login"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {passwordVisible ? (
            <span
              className="password-toggle-login "
              onClick={togglePasswordVisibility}
            >
              <img src="/hide.png" alt="hide" className="eye-login" />{" "}
            </span>
          ) : (
            <span
              className="password-toggle-login "
              onClick={togglePasswordVisibility}
            >
              <img src="/view.png" alt="view" className="eye-login" />{" "}
            </span>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

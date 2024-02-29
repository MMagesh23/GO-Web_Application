import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    phone: "",
    address: "",
    district: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");

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

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError("Passwords do not match");
    } else {
      try {
        await axios.post("http://localhost:5000/signup", formData);
        console.log("Signup successful!");
        navigate("/login");
      } catch (error) {
        if (error.response) {
          console.error("Error signing up:", error.response.data);
        } else {
          console.error("Error signing up:", error.message);
        }
        toast.error(
          "An error occurred during signup. Please try again.this phone number already exists"
        );
      }
    }
  };

  return (
    <div className="signup-container-signup">
      <ToastContainer />{" "}
      {/* Place ToastContainer at the root of your application */}
      <h2 className="signup-topic">SIGN UP</h2>
      <form className="signup-form-signup" onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name<span className="signup-required">*</span>
        </label>
        <input
          type="text"
          className="custom-input-signup"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="custom-input-signup"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">
          Password<span className="signup-required">*</span>
        </label>
        <div className="password-input-signup">
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            className="custom-input-signup"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className="password-toggle-signup"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <img src="/hide.png" alt="hide" className="eye-signup" />
            ) : (
              <img src="/view.png" alt="view" className="eye-signup" />
            )}
          </span>
        </div>

        <label htmlFor="confirmPassword">
          Confirm Password<span className="signup-required">*</span>
        </label>
        <div className="password-input-signup">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            id="confirmPassword"
            className="custom-input-signup"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span
            className="password-toggle-signup"
            onClick={toggleConfirmPasswordVisibility}
          >
            {confirmPasswordVisible ? (
              <img src="/hide.png" alt="hide" className="eye-signup" />
            ) : (
              <img src="/view.png" alt="view" className="eye-signup" />
            )}
          </span>
        </div>
        {passwordMatchError && (
          <div className="signup-error-message">{passwordMatchError}</div>
        )}

        <label htmlFor="gender">
          Gender<span className="signup-required">*</span>
        </label>
        <div className="signup-radio-container">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={handleChange}
            required
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={handleChange}
            required
          />
          <label htmlFor="female">Female</label>
        </div>

        <label htmlFor="dob">
          Date of Birth<span className="signup-required">*</span>
        </label>
        <input
          type="date"
          className="custom-input-signup"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">
          Phone Number<span className="signup-required">*</span>
        </label>
        <div className="signup-phone-number">
          <select
            id="country-code"
            name="country-code"
            value={formData["country-code"]}
            onChange={handleChange}
            required
          >
            <option value="+91">+91 (India)</option>
            <option value="+1">+1 (USA)</option>
            {/* Add more country codes as needed */}
          </select>
          <input
            type="tel"
            className="custom-input-signup"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="address">
          Address<span className="signup-required">*</span>
        </label>
        <textarea
          id="address"
          className="custom-input-signup"
          name="address"
          rows="2"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="district">
          District<span className="signup-required">*</span>
        </label>
        <select
          id="district"
          className="custom-input-signup"
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
        >
          <option value="">-Select-</option>
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
        </select>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

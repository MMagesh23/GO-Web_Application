import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/SignUp.css";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const { t } = useTranslation();

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
      <ToastContainer /> <h2 className="signup-topic">{t("SIGN_UP")}</h2>
      <form className="signup-form-signup" onSubmit={handleSubmit}>
        <label htmlFor="name">
          {t("Name")}
          <span className="signup-required">*</span>
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

        <label htmlFor="email">{t("Email")}</label>
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
          {t("Password_1")}
          <span className="signup-required">*</span>
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
          {t("Confirm Password")}
          <span className="signup-required">*</span>
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
          {t("Gender")}
          <span className="signup-required">*</span>
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
          <label htmlFor="male">{t("Male")}</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={handleChange}
            required
          />
          <label htmlFor="female">{t("Female")}</label>
        </div>

        <label htmlFor="dob">
          {t("Date of Birth")}
          <span className="signup-required">*</span>
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
          {t("Phone_Number_1")}
          <span className="signup-required">*</span>
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
          {t("Address")}
          <span className="signup-required">*</span>
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
          {t("District")}
          <span className="signup-required">*</span>
        </label>
        <select
          id="district"
          className="custom-input-signup"
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
        >
          <option value="">-{t("Select")}-</option>
          <option value="Ariyalur">{t("Ariyalur")}</option>
          <option value="Chengalpattu">{t("Chengalpattu")}</option>
          <option value="Chennai">{t("Chennai")}</option>
          <option value="Coimbatore">{t("Coimbatore")}</option>
          <option value="Cuddalore">{t("Cuddalore")}</option>
          <option value="Dharmapuri">{t("Dharmapuri")}</option>
          <option value="Dindigul">{t("Dindigul")}</option>
          <option value="Erode">{t("Erode")}</option>
          <option value="Kallakurichi">{t("Kallakurichi")}</option>
          <option value="Kancheepuram">{t("Kancheepuram")}</option>
          <option value="Karur">{t("Karur")}</option>
          <option value="Krishnagiri">{t("Krishnagiri")}</option>
          <option value="Madurai">{t("Madurai")}</option>
          <option value="Mayiladuthurai">{t("Mayiladuthurai")}</option>
          <option value="Nagapattinam">{t("Nagapattinam")}</option>
          <option value="Kanniyakumari">{t("Kanniyakumari")}</option>
          <option value="Namakkal">{t("Namakkal")}</option>
          <option value="Perambalur">{t("Perambalur")}</option>
          <option value="Pudukottai">{t("Pudukottai")}</option>
          <option value="Ramanathapuram">{t("Ramanathapuram")}</option>
          <option value="Ranipet">{t("Ranipet")}</option>
          <option value="Salem">{t("Salem")}</option>
          <option value="Sivagangai">{t("Sivagangai")}</option>
          <option value="Tenkasi">{t("Tenkasi")}</option>
          <option value="Thanjavur">{t("Thanjavur")}</option>
          <option value="Theni">{t("Theni")}</option>
          <option value="Thiruvallur">{t("Thiruvallur")}</option>
          <option value="Thiruvarur">{t("Thiruvarur")}</option>
          <option value="Thoothukudi">{t("Thoothukudi")}</option>
          <option value="Trichirappalli">{t("Trichirappalli")}</option>
          <option value="Thirunelveli">{t("Thirunelveli")}</option>
          <option value="Tirupathur">{t("Tirupathur")}</option>
          <option value="Tiruppur">{t("Tiruppur")}</option>
          <option value="Tiruvannamalai">{t("Tiruvannamalai")}</option>
          <option value="The Nilgiris">{t("The Nilgiris")}</option>
          <option value="Vellore">{t("Vellore")}</option>
          <option value="Viluppuram">{t("Viluppuram")}</option>
          <option value="Virudhunagar">{t("Virudhunagar")}</option>
        </select>

        <button type="submit">{t("Sign Up")}</button>
      </form>
    </div>
  );
};

export default SignUp;

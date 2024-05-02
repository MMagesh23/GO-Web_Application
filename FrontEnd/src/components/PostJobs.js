import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/PostJobs.css";
import authService from "./authService";
import { useTranslation } from "react-i18next";

const PostJob = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    title: "",
    category: "",
    district: "",
    date: "",
    time: "",
    numberOfPeople: 1,
    status: "Active",
    location: "",
    description: "",
  });

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    setIsLoggedIn(authService.isAuthenticated());
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatTimeWithAmPm = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedHours = parseInt(hours) % 12 || 12;
    const period = parseInt(hours) >= 12 ? "pm" : "am";
    return `${formattedHours.toString().padStart(2, "0")}:${minutes} ${period}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { time, ...restFormData } = formData;
      const formattedTime = formatTimeWithAmPm(time);
      const updatedFormData = { ...restFormData, time: formattedTime };

      const token = authService.getToken();
      await axios.post("http://localhost:5000/post-job", updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Job posted successfully !");
      toast.success("Job posted successfully !");
      clearForm();
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Error posting job. Please try again later.");
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      phone: "",
      title: "",
      category: "",
      district: "",
      date: "",
      time: "",
      numberOfPeople: 1,
      status: "Active",
      location: "",
      description: "",
    });
  };

  return (
    <div>
      {isLoggedIn && (
        <div className="post-job-container">
          <ToastContainer />
          <h2 className="post-job-topic">{t("POST A JOB")}</h2>
          <form onSubmit={handleSubmit} className="post-job-form">
            <label htmlFor="name">
              {t("Name")}
              <span className="post-job-required">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="custom-input-post-job"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">
              {t("Phone_Number")}
              <span className="post-job-required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              className="custom-input-post-job"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label htmlFor="title">
              {t("Title")}
              <span className="post-job-required">*</span>
            </label>
            <input
              type="text"
              id="title"
              className="custom-input-post-job"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label htmlFor="category">
              {t("Category")}
              <span className="post-job-required">*</span>
            </label>
            <select
              id="category"
              className="custom-input-post-job"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">-{t("Select")}-</option>
              <option value="Agriculture">{t("Agriculture")}</option>
              <option value="Garden">{t("Garden")}</option>
              <option value="Cleaning">{t("Cleaning")}</option>
              <option value="Construction">{t("Construction")}</option>
              <option value="Handyman">{t("Handyman")}</option>
              <option value="Transport">{t("Transport")}</option>
              <option value="Home Repairs">{t("Home Repairs")}</option>
              <option value="Painting">{t("Painting")}</option>
              <option value="BabySitting">{t("BabySitting")}</option>
              <option value="Pet Care">{t("Pet Care")}</option>
              <option value="Event Assistance">{t("Event Assistance")}</option>
              <option value="Technology Support">
                {t("Technology Support")}
              </option>
              <option value="Cooking And Catering">
                {t("Cooking and Catering")}
              </option>
              <option value="Freelance Writing">
                {t("Freelance Writing")}
              </option>
              <option value="Graphic Designer">{t("Graphic Designer")}</option>
              <option value="Tutoring">{t("Tutoring")}</option>
              <option value="Fitness And Personal Training">
                {t("Fitness and Personal Training")}
              </option>
              <option value="Photography">{t("Photography")}</option>
              <option value="Beauty And PersonalCare">
                {t("Beauty And Personal Care")}
              </option>
              <option value="Virtual Assistance">
                {t("Virtual Assistance")}
              </option>
              {/* Add options for different categories */}
            </select>

            <label htmlFor="district">
              {t("District")}
              <span className="post-job-required">*</span>
            </label>
            <select
              id="district"
              className="custom-input-post-job"
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
              {/* Add options for different districts */}
            </select>

            <label htmlFor="date">
              {t("Date")}
              <span className="post-job-required">*</span>
            </label>
            <input
              type="date"
              id="date"
              className="custom-input-post-job"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label htmlFor="time">
              {t("Time")}
              <span className="post-job-required">*</span>
            </label>
            <input
              type="time"
              id="time"
              className="custom-input-post-job"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />

            <label htmlFor="numberOfPeople">
              {t("Number of People Required")}
              <span className="post-job-required">*</span>
            </label>
            <input
              type="number"
              id="numberOfPeople"
              className="custom-input-post-job"
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleChange}
              required
            />

            <label htmlFor="status">
              {t("Status")}
              <span className="post-job-required">*</span>
            </label>
            <select
              id="status"
              className="custom-input-post-job"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Active">{t("Active")}</option>
              <option value="Completed">{t("Completed")}</option>
            </select>

            <label htmlFor="location">
              {t("Location")}
              <span className="post-job-required">*</span>
            </label>
            <input
              type="text"
              id="location"
              className="custom-input-post-job"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">
              {t("Description")}
              <span className="post-job-required">*</span>
            </label>
            <textarea
              id="description"
              className="custom-input-post-job"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">{t("Submit")}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostJob;

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/PostJobs.css";
import authService from "./authService";

const PostJob = () => {
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
      const formattedTime = formatTimeWithAmPm(formData.time);
      const updatedFormData = { ...formData, time: formattedTime };

      const token = authService.getToken(); // Assuming you have a function to retrieve the authentication token
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

  // Function to clear the form fields after submission
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
    <div className="post-job-container">
      <ToastContainer />
      <h2 className="post-job-topic">POST A JOB</h2>
      <form onSubmit={handleSubmit} className="post-job-form">
        <label htmlFor="name">
          Name<span className="post-job-required">*</span>
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
          Phone Number<span className="post-job-required">*</span>
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
          Title<span className="post-job-required">*</span>
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
          Category<span className="post-job-required">*</span>
        </label>
        <select
          id="category"
          className="custom-input-post-job"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-Select-</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Garden">Garden</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Construction">Construction</option>
          <option value="Handyman">Handyman</option>
          <option value="Transport">Transport</option>
          <option value="Home Repairs">Home Repairs</option>
          <option value="Painting">Painting</option>
          <option value="BabySitting">BabySitting</option>
          <option value="Pet Care">Pet Care</option>
          <option value="Event Assistance">Event Assistance</option>
          <option value="Technology Support">Technology Support</option>
          <option value="Cooking And Catering">Cooking and Catering</option>
          <option value="Freelance Writing">Freelance Writing</option>
          <option value="Graphic Designer">Graphic Designer</option>
          <option value="Tutoring">Tutoring</option>
          <option value="Fitness And Personal Training">
            Fitness and Personal Training
          </option>
          <option value="Photography">Photography</option>
          <option value="Beauty And PersonalCare">
            Beauty And Personal Care
          </option>
          <option value="Virtual Assistance">Virtual Assistance</option>
          {/* Add options for different categories */}
        </select>

        <label htmlFor="district">
          District<span className="post-job-required">*</span>
        </label>
        <select
          id="district"
          className="custom-input-post-job"
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
          {/* Add options for different districts */}
        </select>

        <label htmlFor="date">
          Date<span className="post-job-required">*</span>
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
          Time<span className="post-job-required">*</span>
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
          Number of People Required<span className="post-job-required">*</span>
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
          Status<span className="post-job-required">*</span>
        </label>
        <select
          id="status"
          className="custom-input-post-job"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>

        <label htmlFor="location">
          Location<span className="post-job-required">*</span>
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
          Description<span className="post-job-required">*</span>
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostJob;

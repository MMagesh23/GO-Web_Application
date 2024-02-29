import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import authService from "./authService";
import "../style/EditJob.css";

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = authService.getToken();
        const response = await axios.get(
          `http://localhost:5000/edit-job/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 404 || !response.data.job) {
          setError("Job not found.");
        } else {
          setFormData(response.data.job);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Error fetching job details. Please try again later.");
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = authService.getToken();
      const formattedTime = formatTimeWithAmPm(formData.time);
      const updatedFormData = { ...formData, time: formattedTime };
      await axios.put(
        `http://localhost:5000/edit-job/${jobId}`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Job updated successfully !");
      toast.success("Job updated successfully");
      navigate("/job/manage-jobs");
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job. Please try again.");
    }
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

  return (
    <div className="edit-job-container">
      <h1>Edit Job</h1>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display error message if error state is set */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Title"
        />
        <select
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
          placeholder="Category"
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
          <option value="Beauty And Personalcare">
            Beauty and Personal Care
          </option>
          <option value="Virtual Assistance">Virtual Assistance</option>
          {/* Add options for different categories */}
        </select>

        <select
          name="district"
          value={formData.district || ""}
          onChange={handleChange}
          placeholder="District"
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

        <input
          type="text"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          type="date"
          name="date"
          value={formData.date || ""}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={formData.time ? formData.time : ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="numberOfPeople"
          value={formData.numberOfPeople || ""}
          onChange={handleChange}
          placeholder="Number Of People"
        />
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Description"
        ></textarea>
        <button type="submit">Update</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditJob;

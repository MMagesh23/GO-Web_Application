import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../style/ManageJobs.css";
import authService from "./authService";

const ManageJobs = () => {
  const [manageJobs, setManageJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManageJobs = async () => {
      try {
        const token = authService.getToken();
        const response = await axios.get(
          "http://localhost:5000/job/manage-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setManageJobs(response.data.jobs);
        console.log("Successfully fetched manage jobs !");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Unauthorized access. Please log in again.");
        } else {
          setError("Error fetching manage jobs. Please try again later.");
        }
      }
    };

    fetchManageJobs();
  }, []);

  // Function to handle job deletion
  const handleDelete = async (jobId) => {
    try {
      const token = authService.getToken();
      // Make DELETE request to backend API to delete the job
      await axios.delete(`http://localhost:5000/delete-job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted job from the state
      setManageJobs(manageJobs.filter((job) => job._id !== jobId));
      console.log("Successfully deleted !");
      // Display success toast
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      // Display error toast
      toast.error("Error deleting job. Please try again later.");
    }
  };

  return (
    <div className="manage-jobs-container">
      <ToastContainer />
      <h1 className="heading-manage">Manage Jobs</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="job-list">
        {manageJobs.map((job) => (
          <div key={job._id} className="job-card">
            <h2>Title: {job.title}</h2>
            <p>Name: {job.name}</p>
            <p>Phone: {job.phone}</p>
            <p>Category: {job.category}</p>
            <p>District: {job.district}</p>
            <p>Location: {job.location}</p>
            <p>Date: {job.date}</p>
            <p>Time: {job.time}</p>
            <p>Number Of People: {job.numberOfPeople}</p>
            <p>Description: {job.description}</p>
            <div className="button-container-man">
              <Link to={`/edit-job/${job._id}`} className="edit-button">
                Edit
              </Link>
              <button
                className="delete-button"
                onClick={() => handleDelete(job._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageJobs;

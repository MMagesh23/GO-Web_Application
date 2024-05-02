import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../style/ManageJobs.css";
import authService from "./authService";
import { useTranslation } from "react-i18next";

const ManageJobs = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslation();
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
        setIsLoggedIn(true);
        setError(null);
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

  const handleDelete = async (jobId) => {
    try {
      const token = authService.getToken();
      await axios.delete(`http://localhost:5000/delete-job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setManageJobs(manageJobs.filter((job) => job._id !== jobId));
      console.log("Successfully deleted !");
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting job. Please try again later.");
    }
  };

  return (
    <div>
      {isLoggedIn && (
        <div className="manage-jobs-container">
          <ToastContainer />
          <h1 className="heading-manage">{t("Manage Jobs")}</h1>
          {error && <p className="error-message">{error}</p>}
          <div className="job-list">
            {manageJobs.map((job) => (
              <div key={job._id} className="job-card">
                <h2>
                  {t("Title")}: {job.title}
                </h2>
                <p>
                  {t("Name")}: {job.name}
                </p>
                <p>
                  {t("Phone_Number")}: {job.phone}
                </p>
                <p>
                  {t("Category")}: {job.category}
                </p>
                <p>
                  {t("District")}: {job.district}
                </p>
                <p>
                  {t("Location")}: {job.location}
                </p>
                <p>
                  {t("Date")}: {job.date}
                </p>
                <p>
                  {t("Time")}: {job.time}
                </p>
                <p>
                  {t("Number Of People")}: {job.numberOfPeople}
                </p>
                <p>
                  {t("Description")}: {job.description}
                </p>
                <div className="button-container-man">
                  <Link to={`/edit-job/${job._id}`} className="edit-button">
                    {t("Edit")}
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(job._id)}
                  >
                    {t("Delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;

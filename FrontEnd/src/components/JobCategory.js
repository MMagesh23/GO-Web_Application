import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/JobCategory.css"; // Updated import for CSS file
import AuthService from "./authService";

const JobCategory = () => {
  const { category } = useParams();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchJobsByCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/jobs/${category}`,
          {
            headers: {
              Authorization: `Bearer ${AuthService.getAuthToken()}`,
            },
          }
        );
        console.log("Jobs fetched successfully!");
        setJobs(response.data.jobs);
        setFilteredJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobsByCategory();
  }, [category]);

  function capitalizeAndFormatTitle(string) {
    const formattedString = string.replace(/-/g, " ").toLowerCase();
    const words = formattedString.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  }

  useEffect(() => {
    const mockDistricts = [
      "Ariyalur",
      "Chengalpattu",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kallakurichi",
      "Kancheepuram",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Mayiladuthurai",
      "Nagapattinam",
      "Kanniyakumari",
      "Namakkal",
      "Perambalur",
      "Pudukottai",
      "Ramanathapuram",
      "Ranipet",
      "Salem",
      "Sivagangai",
      "Tenkasi",
      "Thanjavur",
      "Theni",
      "Thiruvallur",
      "Thiruvarur",
      "Thoothukudi",
      "Trichirappalli",
      "Thirunelveli",
      "Tirupathur",
      "Tiruppur",
      "Tiruvannamalai",
      "The Nilgiris",
      "Vellore",
      "Viluppuram",
      "Virudhunagar",
    ];
    setDistricts(mockDistricts);
  }, []);

  const handleDistrictChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedDistricts([...selectedDistricts, value]);
    } else {
      setSelectedDistricts(selectedDistricts.filter((dist) => dist !== value));
    }
  };

  const handleSaveFilters = () => {
    let filtered = [...jobs];

    if (selectedDistricts.length > 0) {
      filtered = filtered.filter((job) =>
        selectedDistricts.some(
          (district) => district.toLowerCase() === job.district.toLowerCase()
        )
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  return (
    <div className="container-job-category">
      <div className="filters-job-category">
        <h2>Filters</h2>
        <div className="district-filter">
          <h3>District</h3>
          {districts.map((dist) => (
            <div key={dist}>
              <input
                type="checkbox"
                id={dist}
                value={dist}
                onChange={handleDistrictChange}
              />
              <label htmlFor={dist}>{dist}</label>
            </div>
          ))}
        </div>
        <div className="search-filter">
          <h3>Search</h3>
          <input
            type="text"
            placeholder="Search by job title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button onClick={handleSaveFilters}>Save Filters</button>
      </div>
      <div className="job-list-job-category">
        <h1 className="heading-job-category">
          Jobs in {capitalizeAndFormatTitle(category)}
        </h1>
        <ul>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <li key={job._id}>
                <div className="job-details-job-category">
                  <h2>{job.title}</h2>
                  <p>Description: {job.description}</p>
                  <p>Category: {job.category}</p>
                  <p>District: {job.district}</p>
                  <p>Location: {job.location}</p>
                  <p>Date: {job.date}</p>
                  <p>Time: {job.time}</p>
                  <p>Status: {job.status}</p>
                </div>
              </li>
            ))
          ) : (
            <li>No jobs found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default JobCategory;

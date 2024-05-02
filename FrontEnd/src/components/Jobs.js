import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Jobs.css";
import AuthService from "./authService";
import { useTranslation } from "react-i18next";

const Jobs = () => {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobs] = useState([
    {
      id: 1,
      title: "Agriculture",
      category: "agriculture",
      image: "/Agriculture.svg",
    },
    {
      id: 2,
      title: "Garden",
      category: "garden",
      image: "/gardener.svg",
    },
    {
      id: 3,
      title: "Cleaning",
      category: "cleaning",
      image: "/Cleaning.svg",
    },
    {
      id: 4,
      title: "Construction",
      category: "construction",
      image: "/Construction.svg",
    },
    {
      id: 5,
      title: "Handyman",
      category: "handyman",
      image: "/Handyman.svg",
    },
    {
      id: 6,
      title: "Transport",
      category: "transport",
      image: "/Transport.svg",
    },
    {
      id: 7,
      title: "Home Repairs",
      category: "home-repairs",
      image: "/Home-repairs.svg",
    },
    {
      id: 8,
      title: "Painting",
      category: "painting",
      image: "/Painting.svg",
    },
    {
      id: 9,
      title: "BabySitting",
      category: "baby-sitting",
      image: "/Babysitting.svg",
    },
    {
      id: 10,
      title: "Pet Care",
      category: "pet-care",
      image: "/Petcare.svg",
    },
    {
      id: 11,
      title: "Event Assistance",
      category: "event-assistance",
      image: "/Event.svg",
    },
    {
      id: 12,
      title: "Technology Support",
      category: "technology-support",
      image: "/Technology-Support.svg",
    },
    {
      id: 13,
      title: "Cooking and Catering",
      category: "cooking-and-catering",
      image: "/Cooking.svg",
    },
    {
      id: 14,
      title: "Freelance Writing",
      category: "freelance-writing",
      image: "/Writing.svg",
    },
    {
      id: 15,
      title: "Graphic Designer",
      category: "graphic-design",
      image: "/Designer.svg",
    },
    {
      id: 16,
      title: "Tutoring",
      category: "tutoring",
      image: "/Teaching.svg",
    },
    {
      id: 17,
      title: "Fitness and Personal Training",
      category: "fitness-and-personaltraining",
      image: "/Fitness.svg",
    },
    {
      id: 18,
      title: "Photography",
      category: "photography",
      image: "/Photo.svg",
    },
    {
      id: 19,
      title: "Beauty and Personal Care",
      category: "beauty-and-personalcare",
      image: "/Beauty.svg",
    },
    {
      id: 20,
      title: "Virtual Assistance",
      category: "virtual-assistance",
      image: "/Virtual.svg",
    },
  ]);
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    setIsLoggedIn(AuthService.isAuthenticated());
    if (AuthService.isAuthenticated()) {
      console.log("User is authenticated");
    } else {
      console.log("User is not authenticated");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      {isLoggedIn && (
        <div className="jobs-container">
          <h1 className="jobs-heading">{t("Jobs")}</h1>
          <div className="jobs-search-container">
            <input
              type="text"
              className="jobs-search-input"
              placeholder="Search by category..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="jobs-job-container">
            {filteredJobs.map((job) => (
              <Link
                to={`/jobs/${job.category}`}
                key={job.category}
                className="jobs-job-link"
              >
                <div className="jobs-job-item">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="jobs-job-image"
                  />
                  <div className="jobs-job-details">
                    <h2>{job.title}</h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;

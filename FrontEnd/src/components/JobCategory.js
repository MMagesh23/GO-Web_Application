import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/JobCategory.css";
import AuthService from "./authService";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";

const JobCategory = () => {
  const { category } = useParams();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState(null);
  const { t } = useTranslation();

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
        const userIdSet = new Set(
          response.data.jobs.map((job) => job.postedBy)
        );
        const userIdArray = [...userIdSet];
        if (userIdArray.length > 0) {
          setUserId(userIdArray[0]);
          // console.log(userIdArray[0]);
        }
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
      t("Ariyalur"),
      t("Chengalpattu"),
      t("Chennai"),
      t("Coimbatore"),
      t("Cuddalore"),
      t("Dharmapuri"),
      t("Dindigul"),
      t("Erode"),
      t("Kallakurichi"),
      t("Kancheepuram"),
      t("Karur"),
      t("Krishnagiri"),
      t("Madurai"),
      t("Mayiladuthurai"),
      t("Nagapattinam"),
      t("Kanniyakumari"),
      t("Namakkal"),
      t("Perambalur"),
      t("Pudukottai"),
      t("Ramanathapuram"),
      t("Ranipet"),
      t("Salem"),
      t("Sivagangai"),
      t("Tenkasi"),
      t("Thanjavur"),
      t("Theni"),
      t("Thiruvallur"),
      t("Thiruvarur"),
      t("Thoothukudi"),
      t("Trichirappalli"),
      t("Thirunelveli"),
      t("Tirupathur"),
      t("Tiruppur"),
      t("Tiruvannamalai"),
      t("The Nilgiris"),
      t("Vellore"),
      t("Viluppuram"),
      t("Virudhunagar"),
    ];
    setDistricts(mockDistricts);
  }, [t]);

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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleSendMessage = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/chat/${userId}`, {
        headers: {
          Authorization: `Bearer ${AuthService.getAuthToken()}`,
        },
      });

      const chatId = response.data.chatId;

      if (chatId) {
        // If chat exists, implement logic to open the chat interface
        console.log("Opening chat interface...");
        // You can implement logic here to show the chat interface using a modal or redirect to a new route
      } else {
        console.log("Chat does not exist. Creating a new chat interface...");
        // Implement logic to handle the creation of a new chat interface
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Implement error handling
    }
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
                  <Stack direction="row" spacing={0.5} className="Status-But">
                    <Item>
                      <Chip
                        label="Status:"
                        color="success"
                        variant="outlined"
                      />
                      <Chip label={job.status} color="success" />
                    </Item>
                  </Stack>
                  <p>
                    <Box
                      width={850}
                      gap={4}
                      p={2}
                      borderRadius={"10px"}
                      sx={{ border: "2px solid grey" }}
                    >
                      <Chip label="Description:" variant="outlined" />
                      <Typography>{job.description}</Typography>
                    </Box>
                  </p>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                  >
                    <Item>
                      <Stack direction="row" spacing={0.5}>
                        <Chip
                          label="Category:"
                          variant="outlined"
                          color="primary"
                        />
                        <Chip label={job.category} color="primary" />
                      </Stack>
                    </Item>
                    <Item>
                      <Stack direction="row" spacing={0.5}>
                        <Chip
                          label="District:"
                          variant="outlined"
                          color="secondary"
                        />
                        <Chip label={job.district} color="secondary" />
                      </Stack>
                    </Item>
                    <Item>
                      <Stack direction="row" spacing={0.5}>
                        <Chip
                          label="Location:"
                          variant="outlined"
                          color="error"
                        />
                        <Chip label={job.location} color="error" />
                      </Stack>
                    </Item>
                    <Item>
                      <Stack direction="row" spacing={0.5}>
                        <Chip label="Date:" variant="outlined" color="info" />
                        <Chip label={job.date} color="info" />
                      </Stack>
                    </Item>
                  </Stack>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    marginTop={"10px"}
                  >
                    <Item>
                      <Stack direction="row" spacing={0.5}>
                        <Chip
                          label="Time:"
                          variant="outlined"
                          color="warning"
                        />
                        <Chip label={job.time} color="warning" />
                      </Stack>
                    </Item>
                    <Item>
                      <Stack direction="row" spacing={0.5}>
                        <Chip label="Name:" variant="outlined" color="error" />
                        <Chip label={job.name} color="error" />
                      </Stack>
                    </Item>
                    <Item>
                      <Stack direction="row" spacing={0.5}>
                        <Chip
                          label="Phone:"
                          variant="outlined"
                          color="success"
                        />
                        <Chip label={job.phone} color="success" />
                      </Stack>
                    </Item>
                    <Item>
                      <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={handleSendMessage}
                      >
                        Message
                      </Button>
                    </Item>
                  </Stack>
                </div>
                <Divider />
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

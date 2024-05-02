const express = require("express");
const jobController = require("../controllers/jobController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Protected route, only accessible by authenticated users
router.use(verifyToken);

// Route for creating a new job
router.post("/post-job", jobController.createJob);

const categories = [
  "agriculture",
  "garden",
  "cleaning",
  "construction",
  "handyman",
  "transport",
  "home-repairs",
  "painting",
  "baby-sitting",
  "pet-care",
  "event-assistance",
  "technology-support",
  "cooking-and-catering",
  "freelance-writing",
  "graphic-design",
  "tutoring",
  "fitness-and-personaltraining",
  "photography",
  "beauty-and-personalcare",
  "virtual-assistance",
];

categories.forEach((category) => {
  router.get(`/jobs/${category}`, jobController.categoryJobs);
});

//Route for view posted job's
router.get("/job/manage-jobs", jobController.getPostedJobs);

router.get("/edit-job/:jobId", jobController.getEditJobDetails);

//Route for edit job detail's
router.put("/edit-job/:jobId", jobController.editJobDetails);

//Route for delete job
router.delete("/delete-job/:jobId", jobController.deleteJob);

router.get("/jobschart", jobController.jobsChart);

module.exports = router;

const Job = require("../models/Job");

/*_______________________________________________________________________________________
______________________________________ Post a new job
_______________________________________*/
const createJob = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      district,
      location,
      date,
      time,
      name,
      phone,
      numberOfPeople,
    } = req.body;
    const userId = req.userId; // Assuming userId is in the request

    const newJob = new Job({
      title,
      category,
      description,
      district,
      location,
      date,
      time,
      name,
      phone,
      numberOfPeople,
      postedBy: userId, // Assign the userId to postedBy
    });

    await newJob.save();

    return res
      .status(201)
      .json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*___________________________________________________________________________________________
______________________________________ View all job's
_______________________________________*/
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    return res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error getting jobs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*__________________________________________________________________________________________
______________________________________ Fillter a job
_______________________________________*/
const categoryJobs = async (req, res) => {
  try {
    const { district } = req.query;
    let filter = {};

    // Get the category from the URL
    const category = req.path.split("/")[2]; // Assuming the category is the third part of the URL

    if (category) {
      filter.category = category;
      console.log(filter.category);
    }

    if (district) {
      filter.district = district;
    }

    // Add a condition for the date to filter out both expired and completed jobs
    // filter.date = { $gte: new Date() }; // Only fetch jobs with a date greater than or equal to the current date

    // Add a condition to filter out completed jobs
    filter.status = "active"; // Only fetch jobs with an active status

    function modifiedCategory(categ) {
      const words = categ.split("-");
      // Capitalize the first letter of each word
      const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      // Join the capitalized words into a string
      const resultString = capitalizedWords.join(" ");
      return resultString;
    }

    const repl = filter.category; // Replace with your actual category
    const modifiedCategoryString = modifiedCategory(repl);
    console.log(modifiedCategoryString);

    filter.category = modifiedCategoryString;
    //const jobs = await Job.find(filter);
    // console.log("Filter===", filter);
    const jobs = await Job.find(filter);
    // console.log("Result:", jobs);

    return res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error getting jobs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*_______________________________________________________________________________________
______________________________________ View Posed job's
_______________________________________*/
const getPostedJobs = async (req, res) => {
  try {
    const userId = req.userId;

    // Find all jobs posted by the logged-in user
    const jobs = await Job.find({ postedBy: userId });

    return res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error getting jobs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*_______________________________________________________________________________________
______________________________________ Edit job detail's
_______________________________________*/
// Add a function for 12-hour to 24-hour time conversion
function convert12HourTo24Hour(time12h) {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (modifier === "pm" && hours < 12) {
    hours = String(parseInt(hours, 10) + 12);
  }

  if (modifier === "am" && hours === "12") {
    hours = "00";
  }

  return `${hours}:${minutes}`;
}

const getEditJobDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.jobId;

    // Find the job posted by the logged-in user with the given jobId
    const job = await Job.findOne({ _id: jobId, postedBy: userId });

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Assuming job.date is in "DD-MM-YYYY" format
    const [day, month, year] = job.date.split("-");

    // Create a new Date object with the extracted values
    const da = new Date(`${year}-${month}-${day}`);

    const formattedDate = `${year}-${month}-${day}`;

    job.date = formattedDate;

    console.log("Date:", formattedDate);

    // Assuming job.time is in "h:mm AM/PM" format
    const formattedTime = convert12HourTo24Hour(job.time);

    job.time = formattedTime;

    console.log("Time:", formattedTime);

    return res.status(200).json({ job });
  } catch (error) {
    console.error("Error updating job details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const editJobDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.jobId; // Assuming the job ID is provided in the URL

    // Find the job posted by the logged-in user with the given jobId
    const job = await Job.findOne({ _id: jobId, postedBy: userId });

    // console.log("jobId === ", jobId);
    // console.log("userId === ", userId);
    // console.log("job === ", job);

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Update job details based on the request body
    const {
      title,
      description,
      category,
      district,
      location,
      date,
      time,
      name,
      phone,
      numberOfPeople,
    } = req.body;

    // Update only if the field is provided in the request
    if (title) job.title = title;
    if (description) job.description = description;
    if (category) job.category = category;
    if (district) job.district = district;
    if (location) job.location = location;
    if (date) job.date = date;
    if (time) job.time = time;
    if (name) job.name = name;
    if (phone) job.phone = phone;
    if (numberOfPeople) job.numberOfPeople = numberOfPeople;

    // Save the updated job details
    await job.save();

    return res
      .status(200)
      .json({ message: "Job details updated successfully", job });
  } catch (error) {
    console.error("Error updating job details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/*_______________________________________________________________________________________
______________________________________ Delete job
_______________________________________*/

const deleteJob = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.jobId;

    // Find the job posted by the logged-in user with the given jobId
    const job = await Job.findOne({ _id: jobId, postedBy: userId });

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Delete the job
    await Job.deleteOne({ _id: jobId, postedBy: userId });

    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const jobsChart = async (req, res) => {
  try {
    const activeJobs = await Job.find({ status: "active" });

    const categoryCounts = {};

    activeJobs.forEach((job) => {
      const category = job.category;
      if (categoryCounts[category]) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

    return res.status(200).json({ chartData: categoryCounts });
  } catch (error) {
    console.error("Error charting job:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  categoryJobs,
  getPostedJobs,
  getEditJobDetails,
  editJobDetails,
  deleteJob,
  jobsChart,
};

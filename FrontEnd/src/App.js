import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/HomePage";
import Jobs from "./components/Jobs";
import PostJOBS from "./components/PostJobs";
import JobCategory from "./components/JobCategory";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ManageJobs from "./components/ManageJobs";
import EditJob from "./components/EditJob";
// import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/post-job" element={<PostJOBS />} />
        <Route path="/jobs/:category" element={<JobCategory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/job/manage-jobs" element={<ManageJobs />} />
        <Route path="/edit-job/:jobId" element={<EditJob />} />
      </Routes>
    </Router>
  );
};

export default App;

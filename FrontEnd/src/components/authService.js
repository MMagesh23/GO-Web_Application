import axios from "axios";

const AuthService = {
  setAuthToken: (token) => {
    if (token) {
      localStorage.setItem("jwtToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwtToken");
    }
  },
  getAuthToken: () => localStorage.getItem("jwtToken"),
  handleTokenExpiration: () => {
    // Implement token expiration handling logic here
  },
  login: async (username, password) => {
    try {
      // Make HTTP request to your backend API to authenticate user
      const response = await fetch("http://your-api-url/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        // Store token in local storage
        localStorage.setItem("jwtToken", data.token);
        return true; // Login successful
      } else {
        return false; // Login failed
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return false; // Login failed
    }
  },
  logout: () => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
  },
  isAuthenticated: () => {
    // Check if token exists in local storage
    return localStorage.getItem("jwtToken") !== null;
  },
  getToken: () => {
    // Get token from local storage
    return localStorage.getItem("jwtToken");
  },
  // New function to fetch user profile details
  getUserProfile: async () => {
    try {
      // Check if user is authenticated
      if (!AuthService.isAuthenticated()) {
        throw new Error("User is not authenticated");
      }

      // Set authentication token in Axios headers
      const token = AuthService.getToken();
      AuthService.setAuthToken(token);

      // Make request to fetch user profile
      const response = await axios.get("http://localhost:5000/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },
};

export default AuthService;

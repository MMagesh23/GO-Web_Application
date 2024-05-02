import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AuthService from "./authService";
import "../style/NavigationBar.css";
import i18n from "i18next";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@mui/material/Divider";

const drawerWidth = 240;

const languages = [
  { value: "en", text: "English" },
  { value: "ta", text: "Tamil" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  selected: {
    borderBottom: "2px solid #0d3c9b",
  },
}));

const NavigationBar = () => {
  const classes = useStyles();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:960px)");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedIn = await AuthService.isAuthenticated();
        setIsLoggedIn(loggedIn);
        setIsDrawerOpen(loggedIn || isMobile);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    checkAuth();
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = "/";
  };

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem
          button
          component={Link}
          to="/jobs"
          selected={
            location.pathname === "/jobs" ||
            location.pathname.startsWith("/jobs/")
          }
          className={
            (location.pathname === "/jobs" ||
              location.pathname.startsWith("/jobs/")) &&
            classes.selected
          }
        >
          <img src="/Jobs.svg" alt="Jobs Icon" className="Short-icons" />
          <ListItemText primary="Jobs" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/post-job"
          selected={location.pathname === "/post-job"}
          className={location.pathname === "/post-job" ? classes.selected : ""}
        >
          <img
            src="/Post-Jobs.svg"
            alt="Post Jobs Icon"
            className="Short-icons"
          />
          <ListItemText primary="Post Jobs" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/job/manage-jobs"
          selected={
            location.pathname === "/job/manage-jobs" ||
            location.pathname.startsWith("/edit-job/")
          }
          className={
            (location.pathname === "/job/manage-jobs" ||
              location.pathname.startsWith("/edit-job/")) &&
            classes.selected
          }
        >
          <img
            src="/Manage-Jobs.svg"
            alt="Manage Jobs Icon"
            className="Short-icons"
          />
          <ListItemText primary="Manage Jobs" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/jobschart"
          selected={location.pathname === "/jobschart"}
          className={location.pathname === "/jobschart" ? classes.selected : ""}
        >
          <img src="/chart-icon.svg" alt="Chart Icon" className="Short-icons" />
          <ListItemText primary="Jobs Chart" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/maps"
          selected={location.pathname === "/maps"}
          className={location.pathname === "/maps" ? classes.selected : ""}
        >
          <img src="/Location.svg" alt="Loc Icon" className="Short-icons" />
          <ListItemText primary="Maps" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/chatbot"
          selected={location.pathname === "/chatbot"}
          className={location.pathname === "/chatbot" ? classes.selected : ""}
        >
          <img src="/ChatBot.svg" alt="ChatBot Icon" className="Short-icons" />
          <ListItemText primary="ChatBot" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/chat"
          selected={location.pathname === "/chat"}
          className={
            (location.pathname === "/chat" ||
              location.pathname.startsWith("/chat/")) &&
            classes.selected
          }
        >
          <img src="/Chat.svg" alt="Chat Icon" className="Short-icons" />
          <ListItemText primary="Chat" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/profile"
          selected={
            location.pathname === "/profile" ||
            location.pathname === "/profile/edit"
          }
          className={
            (location.pathname === "/profile" ||
              location.pathname === "/profile/edit") &&
            classes.selected
          }
        >
          <img
            src="/Profile-Def.svg"
            alt="Profile Icon"
            className="Short-icons"
          />
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <img src="/Logout.png" alt="Logout Icon" className="Short-icons" />
          <ListItemText primary="Log Out" />
        </ListItem>
        <Divider />
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      {isLoggedIn &&
        location.pathname !== "/signup" &&
        location.pathname !== "/login" &&
        location.pathname !== "/" && (
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
              variant={isMobile ? "temporary" : "permanent"}
              anchor="left"
              open={isDrawerOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </nav>
        )}
      <nav className="navbar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <div className="logo-container">
          <img src="/firstlogo.png" alt="Logo" className="logo-icon" />
          <h2 className="heading-nav">GRUBBER'S OBLIGATION</h2>
        </div>
        <ul className="nav-list">
          {(location.pathname === "/signup" ||
            location.pathname === "/login" ||
            location.pathname === "/") && (
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>
          )}
          {(location.pathname !== "/signup" ||
            location.pathname === "/login" ||
            location.pathname === "/") &&
            location.pathname !== "/jobs" &&
            location.pathname !== "/post-job" &&
            location.pathname !== "/job/manage-jobs" &&
            location.pathname !== "/profile" &&
            location.pathname !== "/profile/edit" &&
            !location.pathname.startsWith("/edit-job/") &&
            !location.pathname.startsWith("/jobs/") &&
            location.pathname !== "/jobschart" &&
            location.pathname !== "/maps" &&
            location.pathname !== "/chatbot" &&
            location.pathname !== "/chat" &&
            !location.pathname.startsWith("/chat/") && (
              <li className="nav-item">
                <Link
                  to="/signup"
                  className={`nav-link ${
                    location.pathname === "/signup" ? "active" : ""
                  }`}
                >
                  Sign Up
                </Link>
              </li>
            )}
          {(location.pathname === "/signup" ||
            location.pathname !== "/login" ||
            location.pathname === "/") &&
            location.pathname !== "/jobs" &&
            location.pathname !== "/post-job" &&
            location.pathname !== "/job/manage-jobs" &&
            location.pathname !== "/profile" &&
            location.pathname !== "/profile/edit" &&
            !location.pathname.startsWith("/edit-job/") &&
            !location.pathname.startsWith("/jobs/") &&
            location.pathname !== "/jobschart" &&
            location.pathname !== "/maps" &&
            location.pathname !== "/chatbot" &&
            location.pathname !== "/chat" &&
            !location.pathname.startsWith("/chat/") && (
              <li className="nav-item">
                <Link
                  to="/login"
                  className={`nav-link ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                >
                  Log In
                </Link>
              </li>
            )}

          {(location.pathname === "/jobs" ||
            location.pathname === "/post-job" ||
            location.pathname === "/profile" ||
            location.pathname === "/profile/edit" ||
            location.pathname === "/job/manage-jobs" ||
            location.pathname.startsWith("/edit-job/") ||
            location.pathname.startsWith("/jobs/") ||
            location.pathname === "/jobschart" ||
            location.pathname === "/maps" ||
            location.pathname === "/chatbot" ||
            location.pathname === "/chat" ||
            location.pathname.startsWith("/chat/")) &&
            isLoggedIn && (
              <li className="nav-item">
                <Link
                  to="/profile"
                  className={`nav-link ${
                    location.pathname === "/profile"
                      ? "active"
                      : "" || location.pathname === "/profile/edit"
                      ? "active"
                      : ""
                  }`}
                >
                  <img
                    src="/Profile-Def.svg"
                    alt="Profile Icon"
                    className="Short-Nav"
                  />
                </Link>
              </li>
            )}
          <li className="nav-item">
            <Select
              value={i18n.language}
              onChange={handleChange}
              variant="outlined"
              className={classes.select}
              style={{ marginRight: "16px", padding: 0 }}
            >
              {languages.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;

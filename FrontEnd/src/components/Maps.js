import React, { useState, useEffect } from "react";
import AuthService from "./authService";
import "../style/Maps.css";

const Maps = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedIn = await AuthService.isAuthenticated();
        setIsLoggedIn(loggedIn);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    checkAuth();
  }, []);

  const openGoogleMaps = () => {
    window.open("https://maps.app.goo.gl/EsGdxC2SdusjenEg8", "_blank");
  };

  return (
    <div>
      {isLoggedIn && (
        <React.Fragment>
          <div className="Maps-container">
            <h1 className="map-topic">Simple Map</h1>
            {/* Button to open Google Maps */}
            <button onClick={openGoogleMaps} type="submit" className="Map-But">
              Open in Google Maps
            </button>
            {/* Google Maps iframe */}
            <div className="iframe-container">
              <iframe
                title="Embedded Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4013002.1553368676!2d75.64718577593037!3d10.81533608044103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0x559475cc463361f0!2sTamil%20Nadu!5e0!3m2!1sen!2sin!4v1713079888871!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Maps;

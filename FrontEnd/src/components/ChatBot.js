import React, { useEffect, useState } from "react";
import AuthService from "./authService";
import "../style/ChatBot.css";

function ChatComponent() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const authenticated = await AuthService.isAuthenticated();
      setAuthenticated(authenticated);
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  if (!authenticated) {
    return <p>Loading...</p>;
  }

  return (
    <div className="chatbot-container">
      <h2 className="chat-head">GrubBot</h2>
      <iframe
        title="Dialogflow Chatbot"
        allow="microphone;"
        width="50%"
        height="430"
        src="https://console.dialogflow.com/api-client/demo/embedded/999cad5d-f4ea-4f23-a46f-b91d751b721a"
      ></iframe>
    </div>
  );
}

export default ChatComponent;

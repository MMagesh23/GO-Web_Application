import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import "../style/Chat.css";
import AuthService from "./authService";
import Chip from "@mui/material/Chip";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = AuthService.getToken();
        const response = await fetch(`http://localhost:5000/chat`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }
        const chatsData = await response.json();
        setChats(chatsData.chatList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const fetchChatMessages = async (userId) => {
    try {
      const token = AuthService.getToken();
      const response = await fetch(`http://localhost:5000/chat/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch chat messages");
      }
      const chatMessagesData = await response.json();
      setChatMessages(chatMessagesData.chatMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      setError(error.message);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" && selectedChat) {
      const newMessageObj = {
        receiver: selectedChat.userId,
        message: newMessage,
      };
      setNewMessage("");

      try {
        const token = AuthService.getToken();
        const response = await fetch(
          `http://localhost:5000/chat/${selectedChat.userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newMessageObj),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to send message");
        }
        await fetchChatMessages(selectedChat.userId);
      } catch (error) {
        console.error("Error sending message:", error);
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <Typography>Loading chat data...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <div className="chat-container">
      {selectedChat ? (
        <ChatInterface
          chat={selectedChat}
          chatMessages={chatMessages}
          onBack={() => setSelectedChat(null)}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      ) : (
        <div>
          <h2>Chats</h2>
          <div className="chat-list">
            {chats.map((chat) => (
              <ChatItem
                key={chat.userId}
                chat={chat}
                onClick={() => {
                  setSelectedChat(chat);
                  fetchChatMessages(chat.userId);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ChatItem = ({ chat, onClick }) => {
  return (
    <Link
      to={`/chat/${chat.userId}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        className="chat-item"
        onClick={onClick}
        sx={{
          border: 1,
          borderRadius: 2,
          borderColor: "primary.main",
          padding: 2,
          marginBottom: 2,
        }}
      >
        <Typography variant="h5">
          {chat.name} - {chat.lastMessage}
        </Typography>
      </Box>
    </Link>
  );
};

const ChatInterface = ({
  chat,
  chatMessages,
  onBack,
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Chat Interface
      </Typography>
      <Typography variant="h6" gutterBottom>
        Chatting with <Chip label={chat.name} color="success" />
      </Typography>
      <div className="message-container">
        {chatMessages.map((message, index) => (
          <Message key={index} message={message} currentUser={chat.userId} />
        ))}
      </div>
      <div className="message-input">
        <TextField
          label="Type a message"
          variant="outlined"
          fullWidth
          value={newMessage}
          style={{ marginBottom: "10px" }}
          onChange={(e) => setNewMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  onClick={handleSendMessage}
                >
                  Send
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Link to="/chat" style={{ textDecoration: "none" }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
      </Link>
    </Paper>
  );
};

const Message = ({ message, currentUser }) => {
  const isSentByCurrentUser = message.sender !== currentUser;

  return (
    <Stack
      direction={isSentByCurrentUser ? "row-reverse" : "row"}
      spacing={2}
      alignItems="center"
      sx={{ marginBottom: 1 }}
    >
      <Paper
        variant="outlined"
        sx={{
          padding: 1,
          backgroundColor: isSentByCurrentUser ? "#DCF8C6" : "#C1E6FD", // Change the color for receiver
        }}
      >
        <Typography variant="body1">{message.message}</Typography>
      </Paper>
    </Stack>
  );
};

export default Chat;

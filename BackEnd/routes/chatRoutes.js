const express = require("express");
const chatController = require("../controllers/chatController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Protected route, only accessible by authenticated users
router.use(verifyToken);

// Route for getting chat messages with a specific user or sending a message to a specific user
router
  .route("/chat/:userId")
  .get(chatController.getUserChat)
  .post(chatController.sendMessage);

// Route for listing user's chat list
router.get("/chat", chatController.getUserChatList);

module.exports = router;

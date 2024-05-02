// controllers/chatController.js
const Chat = require("../models/Chat");
const User = require("../models/User");

const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const receiver = req.params.userId;
    const { message } = req.body;

    // Check if the receiver exists
    const receiverExists = await User.exists({ _id: receiver });
    if (!receiverExists) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    const newMessage = new Chat({ sender, receiver, message });
    await newMessage.save();

    return res
      .status(201)
      .json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserChatList = async (req, res) => {
  try {
    const userId = req.userId;

    // Find all distinct users the authenticated user has chatted with
    const users = await Chat.distinct("receiver", { sender: userId });
    const senders = await Chat.distinct("sender", { receiver: userId });
    const allUsers = [...users, ...senders];

    // Fetch user details and last message for each user in the chat list
    const chatList = await Promise.all(
      allUsers.map(async (user) => {
        try {
          const userDetails = await User.findById(user);
          if (!userDetails) {
            throw new Error(`User with ID ${user} not found`);
          }
          const lastMessage = await Chat.findOne({
            $or: [
              { sender: userId, receiver: user },
              { sender: user, receiver: userId },
            ],
          }).sort({ timestamp: -1 });

          return {
            userId: userDetails._id,
            name: userDetails.name,
            lastMessage: lastMessage ? lastMessage.message : "No messages",
          };
        } catch (error) {
          console.error(`Error fetching details for user ${userId}:`, error);
          return null; // Return null for this user if there's an error
        }
      })
    );

    // Filter out null values from the chatList
    const filteredChatList = chatList.filter((user) => user !== null);

    return res.status(200).json({ chatList: filteredChatList });
  } catch (error) {
    console.error("Error getting user's chat list:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserChat = async (req, res) => {
  try {
    const userId = req.userId;
    const otherUserId = req.params.userId;

    // Fetch chat messages between the authenticated user and the other user
    const chatMessages = await Chat.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ timestamp: 1 });

    return res.status(200).json({ chatMessages });
  } catch (error) {
    console.error("Error getting user chat:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { sendMessage, getUserChatList, getUserChat };

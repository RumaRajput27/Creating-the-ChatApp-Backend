const UsersChat = require("../models/chatModel");

// Get all chat messages
exports.getAllChats = async (req, res) => {
  try {
    const chats = await UsersChat.findAll();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chats", error: error.message });
  }
};

// Get chats for a specific user
exports.getChatsByUserId = async (req, res) => {
  try {
    const chats = await UsersChat.findAll({ where: { userId: req.params.userId } });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chats", error: error.message });
  }
};

// Create a chat message
exports.createChat = async (req, res) => {
  try {
    const { message, userId } = req.body;
    const newChat = await UsersChat.create({ message, userId });
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: "Failed to create chat", error: error.message });
  }
};

// Delete a chat message
exports.deleteChat = async (req, res) => {
  try {
    const chat = await UsersChat.findByPk(req.params.id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    await chat.destroy();
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete chat", error: error.message });
  }
};

const User = require("../models/userModel");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const newUser = await User.create({ username, email, phone, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { username, email, phone } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update({ username, email, phone });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};

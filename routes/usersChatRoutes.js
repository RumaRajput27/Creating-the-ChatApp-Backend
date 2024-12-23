const express = require("express");
const usersChatController = require("../controllers/usersChatController");

const router = express.Router();

router.get("/", usersChatController.getAllChats);
router.get("/user/:userId", usersChatController.getChatsByUserId);
router.post("/", usersChatController.createChat);
router.delete("/:id", usersChatController.deleteChat);

module.exports = router;

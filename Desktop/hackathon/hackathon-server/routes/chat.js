const express = require("express");
const { runChat } = require("../controllers/chatController");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    if (!userInput) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

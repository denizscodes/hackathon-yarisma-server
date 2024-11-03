const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

app.use(express.json());

const MODEL_NAME = "gemini-pro"; // Specify the model you want to use
const API_KEY = process.env.API_KEY; // Store your API key in .env file

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 5000,
  };

  const chat = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: userInput },
          {
            text: "Sen bir soru çözücü botsun,Türkçe konuş sadece. Her soru için önce doğru cevap seçeneğini belirle ve ardından o seçeneğin neden doğru olduğunu açıklayan ayrıntılı bir açıklama yap.",
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  return result.response.text();
}

app.post("/chat", async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log("incoming /chat req", userInput);
    if (!userInput) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

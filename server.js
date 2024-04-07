const OpenAI= require('openai');
const openai = new OpenAI();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
// Use CORS for all routes
app.use(cors());


// API endpoint for processing chat messages
app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: userMessage }],
        model: "gpt-3.5-turbo",
    });

    // Sending back the response from OpenAI API to the frontend
    res.json({ botResponse: response.choices[0].message['content'] });
  } catch (error) {
    console.error("Error calling OpenAI API: ", error);
    res.status(500).send("Error processing your request");
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

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
    // const assistant = await openai.beta.assistants.create({
    //   name: "Math Tutor",
    //   instructions: "You are a personal math tutor. Write and run code to answer math questions.",
    //   tools: [{ type: "code_interpreter" }],
    //   model: "gpt-4-turbo-preview"
    // });
    const assistant = await openai.beta.assistants.retrieve("asst_4NPIexjkkhisW0nPt8KaPEGS");
    const thread = await openai.beta.threads.create();
    const userMessage = req.body.message;
    const message = await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: userMessage,
    });

    const responseText = [];  // Initialize an empty array to store responses

    const run = openai.beta.threads.runs.stream(thread.id, {
        assistant_id: assistant.id
      })
      .on('textCreated', (text) => {
          console.log('Text Created:', text.text);  // Debug log
          responseText.push('\nassistant > ' + text.text);  // Append the text created by the assistant
      })
      .on('textDelta', (textDelta, snapshot) => {
          console.log('Text Delta:', textDelta.value);  // Debug log
          responseText.push(textDelta.value);  // Append text delta
      })
      .on('toolCallCreated', (toolCall) => {
          console.log('Tool Call Created:', toolCall.type);  // Debug log
          responseText.push(`\nassistant > ${toolCall.type}\n\n`);  // Append tool call details
      })
      .on('toolCallDelta', (toolCallDelta, snapshot) => {
          if (toolCallDelta.type === 'code_interpreter') {
              if (toolCallDelta.code_interpreter.input) {
                  console.log('Code Input:', toolCallDelta.code_interpreter.input);  // Debug log
                  responseText.push(toolCallDelta.code_interpreter.input);
              }
              if (toolCallDelta.code_interpreter.outputs) {
                  responseText.push("\noutput >\n");
                  toolCallDelta.code_interpreter.outputs.forEach(output => {
                      console.log('Code Output:', output.logs);  // Debug log
                      if (output.type === "logs") {
                          responseText.push(`\n${output.logs}\n`);
                      }
                  });
              }
          }
      })
      .on('end', () => {
          console.log('Stream ended. Sending response.');  // Debug log when stream ends
          res.json({ botResponse: responseText.join('') });  // Send collected response text when stream ends
      });



  } catch (error) {
    console.error("Error calling OpenAI API: ", error);
    res.status(500).send("Error processing your request");
  }
});


// // API endpoint for processing chat messages
// app.post('/api/chat', async (req, res) => {
//   try {
//     const userMessage = req.body.message;
//     const response = await openai.chat.completions.create({
//         messages: [{ role: "user", content: userMessage }],
//         model: "gpt-4-turbo-preview", //"gpt-3.5-turbo",
//     });

//     // Sending back the response from OpenAI API to the frontend
//     res.json({ botResponse: response.choices[0].message['content'] });
//   } catch (error) {
//     console.error("Error calling OpenAI API: ", error);
//     res.status(500).send("Error processing your request");
//   }
// });

// Starting the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

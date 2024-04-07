# chat-openai

To run this chatbot, you need to navigate to the repo in terminal, and run the server, 
which can be done with `node server.js`. This enables connecting to the OpenAI API using your OpenAI API key. 
Your key needs to be set with `export OPENAI_API_KEY='your-api-key-here'`. 
You will also need to have a payment method set up on your OpenAI account, which can be done at https://platform.openai.com/account/billing/overview.   

You may need to install a few packages such as  
`npm install --global yarn`  
`npm install --save openai`  
`npm install express`  
`npm install cors`  
`yarn add openai`  
`yarn add express`  
for `server.js` to run properly.  

If things are set up correctly, then after running `node server.js`you should see `Server running on http://localhost:3000`  
You can then go to [https://mattjburke.github.io/chat-openai/](https://mattjburke.github.io/chat-openai/) in your browser and chat interactively.

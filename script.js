document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('user-input');
  document.getElementById('send-button').addEventListener('click', sendMessage);
  inputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});

//function sendMessage() {
//  const inputField = document.getElementById('user-input');
//  const userText = inputField.value.trim();
//
//  if (userText !== '') {
//    displayMessage(userText, 'user-message');
//    inputField.value = '';
//    // Simulate bot response
//    setTimeout(() => {
//      const botMsg = 'This is a mock response.';
//      displayMessage(botMsg, 'bot-message');
//    }, 1000);
//  }
//}

function sendMessage() {
  const inputField = document.getElementById('user-input');
  const userText = inputField.value.trim();

  if (userText !== '') {
    displayMessage(userText, 'user-message');
    inputField.value = '';
    fetchBotResponse(userText); // Fetch bot response from your server
  }
}

async function fetchBotResponse(message) {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayMessage(data.botResponse, 'bot-message');
  } catch (error) {
    console.error("Could not fetch bot response: ", error);
    // Display a fallback message or handle errors appropriately
  }
}

function displayMessage(message, className) {
  const chatArea = document.getElementById('chat-area');
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', className);
  msgDiv.textContent = message;
  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight; // Auto-scroll to the latest message
}

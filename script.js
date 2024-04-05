document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('user-input');
  document.getElementById('send-button').addEventListener('click', sendMessage);
  inputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});

function sendMessage() {
  const inputField = document.getElementById('user-input');
  const userText = inputField.value.trim();

  if (userText !== '') {
    displayMessage(userText, 'user-message');
    inputField.value = '';
    // Simulate bot response
    setTimeout(() => {
      const botMsg = 'This is a mock response.';
      displayMessage(botMsg, 'bot-message');
    }, 1000);
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

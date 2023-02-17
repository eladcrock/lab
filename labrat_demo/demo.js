// main.js

const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

const API_URL = 'https://api.example.com/chatgpt';

function addMessage(message, isBot) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    if (isBot) {
        messageElement.classList.add('message-bot');
    } else {
        messageElement.classList.add('message-user');
    }
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
}

function sendMessage(message) {
    addMessage(message, false);
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = data.message;
        addMessage(botMessage, true);
    })
    .catch(error => {
        console.error(error);
        addMessage('Sorry, something went wrong. Please try again later.', true);
    });
}

chatForm.addEventListener('submit', event => {
    event.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
        sendMessage(message);
        chatInput.value = '';
    }
});

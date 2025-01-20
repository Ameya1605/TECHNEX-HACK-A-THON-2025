// script.js
const express = require('express');
const request = require('request');
const app = express();

app.use('/api', (req, res) => {
  const url = 'http://api.example.com' + req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(3000);


app.use(cors()); // Allow all origins

const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.getElementById('sendBTN');
const chatbox = document.querySelector(".chatbox");
const API_KEY = "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"; // Replace with your actual API key

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    chatLi.innerHTML = `<p>${message}</p>`;
    return chatLi;
};

const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");
    const userMessage = messageElement.textContent;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer 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`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    };

    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then(response => response.json())
        .then(data => {
            messageElement.textContent = data.choices[0].message.content;
        })
        .catch(error => {
            messageElement.textContent = "Error: Unable to get response.";
        });
};

const handleChat = () => {
    
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "chat-outgoing"));
    chatInput.value = '';

    const incomingChatLi = createChatLi("Thinking...", "chat-incoming");
    chatbox.appendChild(incomingChatLi);
    generateResponse(incomingChatLi);
};

sendChatBtn.addEventListener("click", handleChat);
fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Process the data
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Display error message to the user
    });
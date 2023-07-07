const socket = io('http://localhost:8000')

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value = '';
})

const appendUser = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    // messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const appendMessage = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const userName = prompt("Enter your name to join");
socket.emit('new-user-joined',userName);

socket.on('user-joined', userName => {
    appendUser(`${userName} joined the chat`,'middle')
});

socket.on('receive', data => {
    appendMessage(`${data.name}: ${data.message}`,'left')
})

socket.on('leave', name => {
    appendUser(`${name} left the chat`,'middle');
})
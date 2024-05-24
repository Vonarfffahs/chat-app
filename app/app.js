const socket = io('ws://localhost:3000');

const sendMessage = (e) => {
    e.preventDefault();
    const input = document.querySelector('#msg-input');
    if (input.value) {
        socket.emit('message', input.value);
        input.value = '';
    }
    input.focus();
}

document.querySelector('form')
    .addEventListener('submit', sendMessage);

// listen for messages
socket.on('message', (data) => {
    const p = document.createElement('p');
    p.textContent = data;
    document.querySelector('#msg-container').appendChild(p);
})
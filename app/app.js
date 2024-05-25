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
    const p = document.createElement('p'),
          span = document.createElement('span');
    p.classList = 'message';
    message = data.split(':');
    span.textContent = message[0];
    p.appendChild(span);
    p.textContent += message[1];
    document.querySelector('#msg-container').appendChild(p);
})
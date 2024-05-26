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

document.querySelector('form').addEventListener('submit', sendMessage);

// listen for messages
socket.on('message', (data) => {
    const p = document.createElement('p'),
          span = document.createElement('span'),
          messageItem = document.createElement('div');

    messageItem.classList = 'message-item';
    span.classList = 'nickname';
    p.classList = 'message';

    const color = '#' + stringToHex(socket.id.toLowerCase()); // unique id color
    span.style.backgroundColor = color;

    message = data.split(':');
    span.textContent = message[0].substring(0,2);
    p.textContent += message[1];

    messageItem.appendChild(span);
    messageItem.appendChild(p);

    document.querySelector('#msg-container').appendChild(messageItem);
})

function stringToHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16);
    }
    return hex.substring(0,6);
}
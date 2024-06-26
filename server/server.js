import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? false : 
            ['http://localhost:5500','http://127.0.0.1:5500']
    }
});

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);

    socket.on('message', data => {
        console.log(`Message: ${data}`);
        io.emit('message', `${socket.id.substring(0,5)}: ${data}`);
    });

    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnected`);
    });
});

httpServer.listen(3000, () => console.log('Listening on port: 3000'));
import http from 'http';
import { Server } from 'socket.io';
import onConnection from './sockets.handlers';

const createIOServer = (server: http.Server) => {
    const io = new Server(server);
    io.on('connection', (socket) => {
        onConnection(socket, io);
    });

    return io;
};

export default createIOServer;

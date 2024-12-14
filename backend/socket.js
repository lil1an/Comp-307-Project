import { Server } from 'socket.io';

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*', // Update with frontend url when finished testing!!
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        // Listen for the user joining their specific room
        socket.on('join', (userId) => {
            console.log(`User ${userId} joined their room`);
            socket.join(userId); // Join a room identified by userId
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};

// Update function for user notification field.
export const sendNotificationUpdate = (userId, hasUnreadNotification) => {
    if (io) {
        io.to(userId).emit('notificationUpdate', { hasUnreadNotification });
    }
};

import http from 'http';
import app from './app.js';
import { initializeSocket } from './socket.js';

const server = http.createServer(app);

// Socket.io functionalities
initializeSocket(server);

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const socketIO = require('socket.io');
const http = require('http');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.json({ status: 'Server running', timestamp: new Date() });
});

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('driver-location', (data) => {
        io.emit('driver-updated', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log('VTC-PRO Server running on port ' + PORT);
});

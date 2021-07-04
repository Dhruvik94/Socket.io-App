const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
const path = require("path")

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

server.listen(3000, () => {
    console.log("Server is Running on Port 3000 .......")
})

io.on('connection', (socket) => {
    console.log("User Connected" + socket.id);

    socket.on("message", (data) => {
        socket.broadcast.emit('message', data);
    });
});
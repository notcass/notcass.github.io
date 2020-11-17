console.log('Server has started.');

const express = require('express');
const app = express();
const server = app.listen(3000);
app.use(express.static('public'));

const socket = require('socket.io');
const io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log(`New Connection: ${socket.id}`);
  socket.on('msg', userMsg);

  function userMsg(data) {
    console.log(data);
    io.sockets.emit('msg', data);
  }
}

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var clients = {};

io.on('connection', function(socket) {
    clients[socket.client.id] = '';

    socket.on('chat message', function(msg) {
        socket.broadcast.emit('chat message', { user: clients[socket.client.id], msg: msg } );
    });
    socket.on('join', function(name) {
        clients[socket.client.id] = name;
        io.emit('users', Object.values(clients));
    });
    socket.on('disconnect', function() {
        delete clients[socket.client.id];
        io.emit('users', Object.values(clients));
    });
});

http.listen(80, function() {
    console.log('listening on *:80');
});
const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');
const users = require('./utils/users');
const {getTeamVolunteers,getNextTeam}= require('../data/volunteers')
 
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log('New socket connection');

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options});

        if(error){
            return callback(error);
        }

        socket.join(user.room);

        socket.emit('message', generateMessage('President of SLGC', 'Welcome! to Shiphai Leikai Guidance Club!'));
        socket.broadcast.to(user.room).emit('message', generateMessage('Volunteers!!', `${user.username} joined the chat`));
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        const filter = new Filter();

        if(filter.isProfane(message)){
            return callback('Profanity not allowed');
        }
        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    });

    socket.on('sendLocation', ({hours, dayName}, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, getTeamVolunteers(hours,dayName)));
        callback();
    });

    socket.on('nextTeam', ({hours,dayName}, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('nextTeamMessage', generateLocationMessage(user.username, getNextTeam(hours,dayName)));
        callback();
    });


    socket.on('disconnect', () => {
        const user =  removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', generateMessage('Volunteers!!', `${user.username} has left the chat`));
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }
    });
});

// var date = new Date();
// day=date.toLocaleString(undefined, {
//     weekday: 'long'
    
//   })

// //console.log(day)

// let date_ob = new Date();

// let hours = date_ob.getHours();
// //console.log(hours)

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
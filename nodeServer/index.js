// Node server which will handel the socket io connection
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
    }
  });

const user = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        user[socket.id] = name;
        socket.broadcast.emit('user-joined', name); 
        console.log('User joined',name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message , name: user[socket.id]});
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', user[socket.id]);
        delete user[socket.id];
    });

})
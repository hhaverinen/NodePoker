const Deck = require('../game/deck.js');
const handranker = require('../game/hand-ranker.js');

const users = {};

const init = function(io) {

  io.of('/chat').on('connection', (socket) => {
    console.log('user connected to chat!');
    users[socket.id] = {};

    socket.on('disconnect', () => {
      console.log('user disconnected from chat!')
      delete users[socket.id];
    });

    socket.on('message', (message) => {
      console.log(message);
      socket.broadcast.emit('message', message);
    });

  });
}

module.exports.init = init;

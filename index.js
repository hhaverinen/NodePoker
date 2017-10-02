const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const port = process.env.PORT || 3000;

const Deck = require('./server/deck.js');

// static files
app.use(express.static(path.join(__dirname, 'client')));

io.on('connection', function(socket) {
  console.log('user connected!');

  socket.on('disconnect', function() {
    console.log('user disconnected!')
  });

  socket.on('deal', function() {
    let deck = new Deck();
    deck.shuffle();
    let hand = deck.deal(5);
    console.log(hand);
    io.emit('deal', hand);
  });
});

// start server
server.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

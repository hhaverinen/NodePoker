const io = require('socket.io')();
const Deck = require('./deck.js');
const handranker = require('./hand-ranker.js');

const players = {};

const listen = function(server) {

  io.on('connection', function(socket) {
    console.log('user connected!');
    players[socket.id] = {};
    let deck;

    socket.on('disconnect', function() {
      console.log('user disconnected!')
      delete players[socket.id];
    });

    socket.on('deal', function() {
      deck = new Deck();
      deck.shuffle();
      let hand = deck.deal(5);
      players[socket.id] = hand;
      socket.emit('deal', hand);
    });

    socket.on('change', function(cards) {
      let hand = players[socket.id];

      for (let i = 0; i < cards.length; i++) {
        for (let j = 0; j < hand.length; j++) {
          let icard = cards[i];
          let jcard = hand[j];
          if (icard.suit == jcard.suit && icard.rank == jcard.rank) {
            hand[j] = deck.dealOne();
          }
        }
      }

      const result = handranker.getBestHand(hand);

      socket.emit('deal', hand); // TODO: own event for changing only changed cards?
      socket.emit('result', result);
    });

  });

  return io.listen(server);
}

module.exports.listen = listen;

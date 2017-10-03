const io = require('socket.io')();
const Deck = require('./deck.js');

const players = {};
let deck;

const listen = function(server) {

  io.on('connection', function(socket) {
    console.log('user connected!');
    players['kissa'] = {};

    socket.on('disconnect', function() {
      console.log('user disconnected!')
      delete players['kissa'];
    });

    socket.on('deal', function() {
      deck = new Deck();
      deck.shuffle();
      let hand = deck.deal(5);
      io.emit('deal', hand);
      players.kissa = hand;
      console.log(players);
    });

    socket.on('change', function(cards) {
      const count = cards.length;
      let hand = players.kissa;
      console.log(hand);
      console.log(cards);
      // TODO: better way to handle cards that needs to be changed
      cards.forEach(function(i) {
        hand = hand.filter(function(j) {
          return (i.suit == j.suit && i.rank == j.rank) ? false : true;
        });
      });
      var newCards = deck.deal(count);
      var newHand = hand.concat(newCards);
      players.kissa = newHand;
      console.log(newHand);
      io.emit('deal', newHand); // TODO: own event for changing only changed cards?
    });

  });

  return io.listen(server);
}

module.exports.listen = listen;

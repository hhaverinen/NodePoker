const Deck = require('./deck.js');
const handranker = require('./hand-ranker.js');

const players = {};

const init = function(io) {

  io.of('/game').on('connection', (socket) => {
    console.log('user connected to game!');
    players[socket.id] = {};
    let deck;

    socket.on('disconnect', () => {
      console.log('user disconnected from game!')
      delete players[socket.id];
    });

    socket.on('register', (name) => {
      players[socket.id]['name'] = name;
      socket.emit('registered', name);
    });

    socket.on('deal', () => {
      deck = new Deck();
      deck.shuffle();
      let hand = deck.deal(5);
      players[socket.id] = hand;
      socket.emit('deal', hand);
    });

    socket.on('change', (cards) => {
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
}

module.exports.init = init;

const Deck = require('./deck.js');
const handranker = require('./hand-ranker.js');

const init = function(io) {

  io.of('/solo-poker-game').on('connection', (socket) => {
    console.log('user connected to solo poker game!');
    let deck, hand;

    socket.on('disconnect', () => {
      console.log('user disconnected from solo poker game!')
    });

/*
    socket.on('register', (name) => {
      players[socket.id]['name'] = name;
      socket.emit('registered', name);
    });
*/
    socket.on('deal', () => {
      deck = new Deck(true); // true shuffles the deck
      hand = deck.deal(5);
      socket.emit('deal', hand);
    });

    socket.on('change', (cards) => {
      cards.forEach(card => {
        let ind = hand.findIndex(el => card.suit === el.suit && card.rank === el.rank);
        if (ind !== -1) {
          hand[ind] = deck.dealOne();
        }
      });

      const result = handranker.getBestHand(hand);

      socket.emit('change', hand);
      socket.emit('result', result);
    });

  });
}

module.exports.init = init;

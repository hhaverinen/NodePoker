const Deck = require('./deck.js');
const handranker = require('./hand-ranker.js');

let players = [];
let deck;
let isRoundGoing = false;

const init = function(io) {

  io.of('/multiplayer-poker-game').on('connection', (socket) => {
    console.log('user connected to multiplayer poker game!');

    if (players.length < 4) { // only 4 players are allowed to join currently
      players.push({hand: [], isReady: false, hasChanged: false, socket: socket}); // initial values
    } else {
      // TODO: show error message that no room for new players
      socket.disconnect();
    }

    if (players.length > 1) { // update players' info about who is online
      players.forEach(pl => {
        let others = players.filter(oth => pl.socket.id !== oth.socket.id);
        let otherNames = others.map(oth => ({name: 'Benedictus', hand: []})); // TODO: name and hand from players[]
        pl.socket.emit('updateplayers', otherNames);
      });
    }

    console.log(`Connected players: ${players.length}`); // debugging

    socket.on('disconnect', () => {
      console.log('user disconnected from multiplayer poker game!')
      players = players.filter(pl => pl.socket.id !== socket.id);

      // TODO own method because same logic is repeated in connections part
      if (players.length == 1) {
        players[0].socket.emit('updateplayers', []); // no other players online
      } else if (players.length > 1) {
        players.forEach(pl => {
          let others = players.filter(oth => pl.socket.id !== oth.socket.id);
          let otherNames = others.map(oth => ({name: 'Benedictus', hand: []})); // TODO: name and hand from players[]
          pl.socket.emit('updateplayers', otherNames);
        });
      }

      // TODO: check if only one player left -> reset whole game
      // TODO: check if player is the who is waited and he/she lefts -> remove player and continue current round normally

    });

    socket.on('deal', () => {
      player = players.filter(pl => pl.socket.id === socket.id)[0];
      if (!player) { // if player not found then return
        return;
      }
      player.isReady = true; // change player isReady value to true

      // game can be started only if there is atleast 2 players and all players are ready
      if (!isRoundGoing && players.length >= 2 && players.filter(pl => pl.isReady === false).length === 0) {
        isRoundGoing = true; // start round
        deck = new Deck(true); // true shuffles the deck
        players.forEach(pl => {
          pl.hand = deck.deal(5);
          pl.socket.emit('deal', pl.hand); // send new hand to view

          // reset view of other players' card
          let others = players.filter(oth => pl.socket.id !== oth.socket.id);
          let otherNames = others.map(oth => ({name: 'Benedictus', hand: []})); // TODO: name and hand from players[]
          pl.socket.emit('updateplayers', otherNames);
        });
      } else {
        socket.emit('waiting', 'Waiting for other players.');
        // TODO: socket event for informing that round couldn't be started
      }
    });

    socket.on('change', (cards) => {
      player = players.filter(pl => pl.socket.id === socket.id)[0]; // TODO: own method for finding player
      if (!player || player.hasChanged) {
        return;
      }
      player.hasChanged = true;

      cards.forEach(card => {
        let ind = player.hand.findIndex(el => card.suit === el.suit && card.rank === el.rank);
        if (ind !== -1) {
          player.hand[ind] = deck.dealOne();
        }
      });

      socket.emit('change', player.hand);

      if (players.filter(pl => pl.hasChanged === false).length === 0) {
        let winner = handranker.getWinningHand(players.map(pl => ({hand: pl.hand, player: socket.id})));
        io.of('/multiplayer-poker-game').emit('result', winner); // TODO logic for showing who won

        players.forEach(pl => {
          let others = players.filter(oth => pl.socket.id !== oth.socket.id);
          let otherHands = others.map(oth => ({name: 'Benedictus', hand: oth.hand}));
          pl.socket.emit('updateplayers', otherHands);
        });

        isRoundGoing = false; // end of round
        players.forEach(pl => { // reset values
          pl.isReady = false;
          pl.hasChanged = false;
          pl.hand = [];
        });
      } else {
        socket.emit('waiting', 'Waiting for other players.');
      }

    });
  });
}

module.exports.init = init;

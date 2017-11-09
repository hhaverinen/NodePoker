const Deck = require('./deck.js');
const Player = require('./player.js');
const handranker = require('./hand-ranker.js');

// TODO: better way to make "empty" hand. Currently suits are just to keep React's keys happy
const emptyHand = [{rank: 0, suit: 'a'}, {rank: 0, suit: 'b'}, {rank: 0, suit: 'c'}, {rank: 0, suit: 'd'}, {rank: 0, suit: 'e'}];

let players = [];
let deck;
let isRoundGoing = false;

/* Updates players' views about other players */
const updatePlayerViews = function() {
  if (players.length > 0) {
    players.forEach(pl => {
      let others = players.filter(oth => pl.socket.id !== oth.socket.id)
        .map(oth => ({name: oth.name, hand: (!isRoundGoing) ? oth.hand : emptyHand})); // show players' cards in the end of the round (isRoundGoing = false)
      pl.socket.emit('updateplayers', others);
    });
  }
}

/* Returns player object from players[], if player not found then return undefined, */
const findPlayer = function(socketId) {
  return players.filter(pl => pl.socket.id === socketId)[0];
}

/* Handles changing of cards */
const handleChange = function(socket, cards) {
  player = findPlayer(socket.id);
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
}

/* Gets object containing winners name, hand and hand ranking */
const getWinner = function() {
  return handranker.getWinningHand(players.filter(pl => pl.isActive).map(pl => ({hand: pl.hand, name: pl.name})));
}

/* Starts round. Returns true if round was started, false otherise */
const startRound = function() {
  // game can be started only if there is atleast 2 players and all players are ready
  if (!isRoundGoing && players.length >= 2 && players.filter(pl => pl.isReady === false).length === 0) {
    isRoundGoing = true; // start round
    players.forEach(pl => {
      pl.resetHand(); // reset players
      pl.isActive = true; // mark player as actively playing current round
    });
    updatePlayerViews(); // reset view of other players' cards
    deck = new Deck(true); // true shuffles the deck
    players.forEach(pl => {
      pl.hand = deck.deal(5);
      pl.socket.emit('start', pl.hand); // send new hand to view
    });
    return true;
  }
  return false;
}

/* Ends round. */
const endRound = function(io) {
  isRoundGoing = false; // end of round
  io.of('/multiplayer-poker-game').emit('result', getWinner()); // determine winner
  updatePlayerViews();
  players.forEach(pl => {
    pl.resetStatuses();
  });
}

/* Logic when player clicks 'Ready', round is started when everyone is ready */
const handleRoundStart = function(socket) {
  player = findPlayer(socket.id);
  if (!player) { // if player not found then return
    return;
  }
  player.isReady = true; // change player isReady value to true

  let roundStarted = startRound();
  if (!roundStarted) {// if round couldn't be started, then show waiting message
    sendMessage(socket, 'Waiting for other players.');
  }
}

/* Logic for checking if round can be ended */
const handleRoundEnd = function(socket, io) {
  if (players.filter(pl => pl.isActive).filter(pl => !pl.hasChanged).length === 0) {
    endRound(io);
  } else {// if round couldn't be ended yet, then show waiting message
    sendMessage(socket, 'Waiting for other players.');
  }
}

/* Logic when user connects to game */
const handleConnect = function(socket) {
  if (players.length < 4) { // only 4 players are allowed to join currently // TODO: support for rooms
    players.push(new Player(socket, socket.handshake.query.name));
  } else {
    sendMessage(socket, 'We are sorry but all the seats are taken. Please try again later.');
    socket.disconnect();
  }
  updatePlayerViews();
}

/* Logic when user disconnects from game */
const handleDisconnect = function(socket, io) {
  players = players.filter(pl => pl.socket.id !== socket.id); // remove player

  if (players.length === 0) {
    isRoundGoing = false; // reset game status
  } else if (players.filter(pl => pl.isActive).length === 1) {
    endRound(io);
  } else if (!isRoundGoing && players.filter(pl => !pl.isReady).length === 0) {
    startRound();
  } else if (isRoundGoing && players.filter(pl => pl.isActive).filter(pl => !pl.hasChanged).length === 0) {
    endRound(io);
  }

  updatePlayerViews();
}

/* Sends message to socket */
const sendMessage = function(socket, message) {
  socket.emit('message', message);
}

const init = function(io) {
  // TODO: logic for more robust joining: user can only join and will be added to players-list when there is no round going on
  io.of('/multiplayer-poker-game').on('connection', (socket) => {
    console.log('user connected to multiplayer poker game!');
    handleConnect(socket);

    console.log(`Connected players: ${players.length}`);

    socket.on('disconnect', () => {
      console.log('user disconnected from multiplayer poker game!');
      handleDisconnect(socket, io);
    });

    socket.on('start', () => {
      handleRoundStart(socket);
    });

    socket.on('change', (cards) => {
      handleChange(socket, cards);
      handleRoundEnd(socket, io);
    });
  });
}

module.exports.init = init;

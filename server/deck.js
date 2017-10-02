const shuffle = require('shuffle-array');

function Deck() {
  this.cards = [];

  const suits = ['H', 'C', 'S', 'D'];
  for (i = 0; i < 4; i++) {
    let suit = suits[i];
    for (j = 1; j < 14; j++) {
      this.cards.push(new Card(suit, j));
    }
  }

}

Deck.prototype = {

  shuffle: function() {
    shuffle(this.cards)
  },

  deal: function(amount) {
    return this.cards.splice(0, amount);
  }

}

// TODO: move to own file in future if need
function Card(suit, rank) {
  this.suit = suit
  this.rank = rank
}

module.exports = Deck;

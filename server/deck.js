const shuffle = require('shuffle-array');

function Deck() {
  this.cards = [];

  const suits = ['h', 'c', 's', 'd'];
  for (i = 0; i < suits.length; i++) {
    let suit = suits[i];
    for (j = 1; j < 14; j++) {
      this.cards.push( { suit: suit, rank: j } );
    }
  }

}

Deck.prototype = {

  shuffle: function() {
    shuffle(this.cards)
  },

  deal: function(amount) {
    return this.cards.splice(0, amount);
  },

  dealOne: function() {
    return this.cards.shift();
  }

}

module.exports = Deck;

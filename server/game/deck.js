const shuffle = require('shuffle-array');

class Deck {
  constructor(shuffle=false) {
    this.cards = [];

    const suits = ['h', 'c', 's', 'd'];
    for (let i = 0; i < suits.length; i++) {
      let suit = suits[i];
      for (let j = 1; j < 14; j++) {
        this.cards.push( { suit: suit, rank: j } );
      }
    }

    if(shuffle) {
      this.shuffle();
    }
  }

  shuffle() {
    shuffle(this.cards);
  }

  deal(amount) {
    return this.cards.splice(0, amount);
  }

  dealOne() {
    return this.cards.shift();
  }

}

module.exports = Deck;

const isFiveOfAKind = function(hand) {
  return isNumberOfAKind(hand, 5);
}

const isStraightFlush = function(hand) {
  return isFlush(hand) && isStraight(hand)
}

const isFourOfAKind = function(hand) {
  return isNumberOfAKind(hand, 4);
}

const isFullHouse = function(hand) {
  const counts = Object.values(getCardCounts(hand));
  return counts.includes(2) && counts.includes(3);
}

const isFlush = function(hand) {
  return hand.every((a) => a.suit == hand[0].suit);
}

const isStraight = function(hand) {
  let sortedCopy = hand.slice(0).sort((a,b) => a.rank - b.rank);
  let prevValue = sortedCopy.shift().rank;

  for(let i = 0; i < sortedCopy.length; i++) {
    let value = sortedCopy[i].rank;
    if (value == prevValue + 1) {
      prevValue = value;
    } else {
      return false;
    }
  }

  return true;
}

const isThreeOfAKind = function(hand) {
  return isNumberOfAKind(hand, 3);
}

const isTwoPair = function(hand) {
  const counts = Object.values(getCardCounts(hand));
  let index = counts.indexOf(2);
  if (index != -1) {
    counts.splice(index, 1); // remove first pair
    return counts.includes(2);
  }

  return false;
}

const isOnePair = function(hand) {
  return isNumberOfAKind(hand, 2);
}

const isNumberOfAKind = function(hand, amount) {
  return Object.values(getCardCounts(hand)).includes(amount);
}

const getCardCounts = function(hand) {
  const counts = {};
  hand.forEach((a) => counts[a.rank] = (counts[a.rank] || 0) + 1);
  return counts;
}

const ranker = {

  getBestHand: function(hand) {
    switch(true) {
      case isFiveOfAKind(hand): // TODO: there is no joker support yet
        return {
          value: 9,
          name: "Five of a kind"
        };
      case isStraightFlush(hand):
        return {
          value: 8,
          name: "Straight flush"
        };
      case isFourOfAKind(hand):
        return {
          value: 7,
          name: "Four of a kind"
        };
      case isFullHouse(hand):
        return {
          value: 6,
          name: "Full house"
        };
      case isFlush(hand):
        return {
          value: 5,
          name: "Flush"
        };
      case isStraight(hand):
        return {
          value: 4,
          name: "Straight"
        };
      case isThreeOfAKind(hand):
        return {
          value: 3,
          name: "Three of a kind"
        };
      case isTwoPair(hand):
        return {
          value: 2,
          name: "Two pair"
        };
      case isOnePair(hand):
        return {
          value: 1,
          name: "One pair"
        };
      default: // high card
        return {
          value: 0,
          name: 'Highest card'
        };
    }
  },

  getWinningHand: function(hands) {
    // TODO: this doesn't take into account draws
    return hands.sort((a, b) => this.getBestHand(b.hand).value - this.getBestHand(a.hand).value)[0];
  }

}

module.exports = ranker

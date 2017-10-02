const React = require('react');
const Card = require('./Card.js');

class Hand extends React.Component {
  render() {
    const cards = [];
    this.props.cards.forEach(function(card) {
      cards.push(
        <Card suit={card.suit} rank={card.rank} key={`${card.suit}${card.rank}`} />
      );
    });
    return <div>{cards}</div>;
  }
}

module.exports = Hand;

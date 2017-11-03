const React = require('react');
const Card = require('./Card.js');

class Hand extends React.Component {
  render() {
    const cards = [];
    this.props.cards.forEach((card) => {
      cards.push(
        <Card suit={card.suit} rank={card.rank} key={`${card.suit}${card.rank}`} />
      );
    });
    return <div className="hand">{cards}</div>;
  }
}

module.exports = Hand;

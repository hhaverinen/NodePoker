const React = require('react');
const Card = require('./Card.js');

class Hand extends React.Component {
  render() {
    return <div className="hand">
            {
              this.props.cards.map((card) => (
                <Card card={card} key={`${card.suit}${card.rank}`}
                handleCardSelect={this.props.handleCardSelect} />
              ))
            }
           </div>;
  }
}

module.exports = Hand;

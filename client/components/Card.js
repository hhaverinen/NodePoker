const React = require('react');

class Card extends React.Component {
  render() {
    // TODO: more elegant way to determine correct image (+ jokers doesn't work currently)
    const imgName = this.props.suit.toLowerCase() + (this.props.rank >= 10 ? this.props.rank : "0" + this.props.rank) + ".bmp";
    return <li className="card"><img src={`./assets/images/cards/${imgName}`} /></li>;
  }
}

module.exports = Card;
